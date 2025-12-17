// src/api.ts

export type AlertStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
    ...init,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(
      `API error ${res.status} ${res.statusText}${text ? `: ${text}` : ''}`
    )
  }

  return (await res.json()) as T
}

// ✅ These hit Vite proxy (http://localhost:517x/api -> http://localhost:4000)
export function apiGet<T>(path: string) {
  return apiFetch<T>(`/api${path}`)
}

export function apiPatch<T>(path: string, body: unknown) {
  return apiFetch<T>(`/api${path}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
  })
}
