import { useMemo, useState } from 'react'
import { buildings, initialAlerts } from '../data/mockData'
import type { AlertStatus, Severity } from '../data/mockData'

type SeverityFilter = 'ALL' | Severity

const AlertsPage = () => {
  const [alerts, setAlerts] = useState(initialAlerts)

  const [statusFilter, setStatusFilter] = useState<'ALL' | AlertStatus>('ALL')
  const [severityFilter, setSeverityFilter] = useState<SeverityFilter>('ALL')
  const [search, setSearch] = useState('')

  const getBuildingName = (buildingId: string) =>
    buildings.find((b) => b.id === buildingId)?.name ?? buildingId

  const updateStatus = (id: string, newStatus: AlertStatus) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, status: newStatus } : alert
      )
    )
  }

  const filteredAlerts = useMemo(() => {
    const q = search.trim().toLowerCase()

    return alerts.filter((alert) => {
      // 1) Status filter
      if (statusFilter !== 'ALL' && alert.status !== statusFilter) return false

      // 2) Severity filter
      if (severityFilter !== 'ALL' && alert.severity !== severityFilter) return false

      // 3) Search filter (title/description/building name)
      if (!q) return true

      const buildingName = getBuildingName(alert.buildingId).toLowerCase()
      const title = alert.title.toLowerCase()
      const desc = alert.description.toLowerCase()

      return title.includes(q) || desc.includes(q) || buildingName.includes(q)
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
        {/* Search */}
        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search alerts by title, description, or building…"
            className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-slate-900"
          />
        </div>

        {/* Severity filter */}
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

      {/* Alerts list */}
      <div className="bg-white rounded-xl shadow divide-y">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 flex items-start justify-between gap-4"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium truncate">{alert.title}</p>

              <p className="text-xs text-slate-500">
                <span className="font-medium">
                  {getBuildingName(alert.buildingId)}
                </span>
                {' • '}
                {alert.description}
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
                  {alert.severity}
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
    </div>
  )
}

export default AlertsPage
