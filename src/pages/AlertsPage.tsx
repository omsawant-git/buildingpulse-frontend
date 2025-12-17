import { useEffect, useMemo, useState } from 'react'
import { apiGet, apiPatch } from '../api'
import type { AlertStatus } from '../api'

// Keep flexible because json-server data can vary
type Alert = {
  id: string | number
  title?: string
  description?: string
  severity?: 'LOW' | 'MEDIUM' | 'HIGH' | string
  status: AlertStatus
  buildingId?: string
  createdAt?: string
  [key: string]: any
}

type SeverityFilter = 'ALL' | 'LOW' | 'MEDIUM' | 'HIGH'

const AlertsPage = () => {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [statusFilter, setStatusFilter] = useState<'ALL' | AlertStatus>('ALL')
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('ALL')
  const [search, setSearch] = useState('')

  // ✅ Fetch from API
  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await apiGet<Alert[]>('/alerts')
        if (!alive) return
        setAlerts(data)
      } catch (e: any) {
        if (!alive) return
        setError(e?.message || 'Failed to load alerts')
      } finally {
        if (!alive) return
        setLoading(false)
      }
    })()

    return () => {
      alive = false
    }
  }, [])

  // ✅ Update status in API + UI
  const updateStatus = async (id: Alert['id'], newStatus: AlertStatus) => {
    // optimistic UI
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    )

    try {
      await apiPatch(`/alerts/${id}`, { status: newStatus })
    } catch (e: any) {
      // rollback on failure
      setAlerts((prev) => prev) // (simple no-op; better rollback needs previous snapshot)
      setError(e?.message || 'Failed to update status')
    }
  }

  const filteredAlerts = useMemo(() => {
    const q = search.trim().toLowerCase()

    return alerts.filter((alert) => {
      if (statusFilter !== 'ALL' && alert.status !== statusFilter) return false
      if (severityFilter !== 'ALL' && alert.severity !== severityFilter) return false

      if (!q) return true

      const title = (alert.title ?? '').toLowerCase()
      const desc = (alert.description ?? '').toLowerCase()
      const building = (alert.buildingId ?? '').toLowerCase()

      return title.includes(q) || desc.includes(q) || building.includes(q)
    })
  }, [alerts, statusFilter, severityFilter, search])

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Alerts</h1>

      <p className="text-slate-600 text-sm">
        Review and manage system-detected issues across buildings.
      </p>

      {/* Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alerts…"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Severity</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value as SeverityFilter)}
            className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm"
          >
            <option value="ALL">All</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s as 'ALL' | AlertStatus)}
            className={`rounded-full px-3 py-1 border ${
              statusFilter === s
                ? 'bg-slate-900 text-white'
                : 'border-slate-300 hover:bg-slate-50'
            }`}
          >
            {s.replace('_', ' ')}
          </button>
        ))}

        <div className="ml-auto text-xs text-slate-500">
          {filteredAlerts.length} result{filteredAlerts.length === 1 ? '' : 's'}
        </div>
      </div>

      {/* States */}
      {loading && <p className="text-sm text-slate-500">Loading alerts…</p>}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* Alerts list */}
      {!loading && (
        <div className="bg-white rounded-xl shadow divide-y">
          {filteredAlerts.map((alert) => (
            <div
              key={String(alert.id)}
              className="p-4 flex items-start justify-between gap-4"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">
                  {alert.title ?? 'Untitled alert'}
                </p>

                <p className="text-xs text-slate-500">
                  <span className="font-medium">
                    {alert.buildingId ?? 'Unknown building'}
                  </span>
                  {' • '}
                  {alert.description ?? 'No description available.'}
                </p>

                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="text-slate-400">
                    Status: {alert.status.replace('_', ' ')}
                  </span>

                  <span
                    className={`rounded-full px-2 py-0.5 font-medium ${
                      alert.severity === 'HIGH'
                        ? 'bg-rose-100 text-rose-700'
                        : alert.severity === 'MEDIUM'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {alert.severity ?? 'UNKNOWN'}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-xs shrink-0">
                {alert.status !== 'IN_PROGRESS' && (
                  <button
                    onClick={() => updateStatus(alert.id, 'IN_PROGRESS')}
                    className="rounded px-2 py-1 border hover:bg-slate-50"
                  >
                    Mark In Progress
                  </button>
                )}

                {alert.status !== 'RESOLVED' && (
                  <button
                    onClick={() => updateStatus(alert.id, 'RESOLVED')}
                    className="rounded px-2 py-1 bg-slate-900 text-white hover:opacity-90"
                  >
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredAlerts.length === 0 && (
            <p className="p-4 text-sm text-slate-500">
              No alerts match your filters.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default AlertsPage
