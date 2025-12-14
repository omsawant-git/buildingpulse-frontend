import type { ReactNode } from 'react'

type Props = {
  label: string
  value: string
  helper?: string
  icon: ReactNode
  tone?: 'indigo' | 'emerald' | 'amber' | 'rose'
}

const toneClasses: Record<NonNullable<Props['tone']>, string> = {
  indigo: 'bg-indigo-50 text-indigo-700 ring-indigo-200',
  emerald: 'bg-emerald-50 text-emerald-700 ring-emerald-200',
  amber: 'bg-amber-50 text-amber-800 ring-amber-200',
  rose: 'bg-rose-50 text-rose-700 ring-rose-200',
}

const StatCard = ({ label, value, helper, icon, tone = 'indigo' }: Props) => {
  return (
    <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
          {helper && <p className="mt-1 text-sm text-slate-500">{helper}</p>}
        </div>

        <div
          className={`shrink-0 rounded-2xl ring-1 p-3 ${toneClasses[tone]}`}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatCard
