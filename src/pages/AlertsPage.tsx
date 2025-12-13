import { useState } from 'react'
import { initialAlerts } from '../data/mockData'
import type { AlertStatus } from '../data/mockData'

const AlertsPage = () => {
  const [alerts, setAlerts] = useState(initialAlerts)
  const [filter, setFilter] = useState<'ALL' | AlertStatus>('ALL')

  const filteredAlerts =
    filter === 'ALL'
      ? alerts
      : alerts.filter((alert) => alert.status === (filter as AlertStatus))

  const updateStatus = (id: string, newStatus: AlertStatus) => {
    setAlerts((prevAlerts) =>
      prevAlerts.map((alert) =>
        alert.id === id ? { ...alert, status: newStatus } : alert
      )
    )
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Alerts</h1>

      <p className="text-slate-600 text-sm">
        Review and manage system-detected issues across buildings.
      </p>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 text-xs">
        {['ALL', 'OPEN', 'IN_PROGRESS', 'RESOLVED'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as 'ALL' | AlertStatus)}
            className={`rounded-full px-3 py-1 border ${
              filter === status ? 'bg-slate-900 text-white' : 'border-slate-300'
            }`}
          >
            {status.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Alerts list */}
      <div className="bg-white rounded-xl shadow divide-y">
        {filteredAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-4 flex items-start justify-between gap-4"
          >
            <div>
              <p className="text-sm font-medium">{alert.title}</p>

              <p className="text-xs text-slate-500">{alert.description}</p>

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

            <div className="flex flex-col gap-2 text-xs">
              {alert.status !== 'IN_PROGRESS' && (
                <button
                  onClick={() => updateStatus(alert.id, 'IN_PROGRESS')}
                  className="rounded px-2 py-1 border"
                >
                  Mark In Progress
                </button>
              )}

              {alert.status !== 'RESOLVED' && (
                <button
                  onClick={() => updateStatus(alert.id, 'RESOLVED')}
                  className="rounded px-2 py-1 bg-slate-900 text-white"
                >
                  Resolve
                </button>
              )}
            </div>
          </div>
        ))}

        {filteredAlerts.length === 0 && (
          <p className="p-4 text-sm text-slate-500">No alerts for this filter.</p>
        )}
      </div>
    </div>
  )
}

export default AlertsPage
