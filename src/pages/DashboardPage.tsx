import { buildings, initialAlerts } from '../data/mockData'

const DashboardPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-slate-600 text-sm">
        High-level overview of buildings, energy usage, and active alerts.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Buildings
          </p>
          {}
          <p className="mt-2 text-2xl font-bold">
            {buildings.length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Active Alerts
          </p>
          {}
          <p className="mt-2 text-2xl font-bold">
            {initialAlerts.filter(a => a.status !== 'RESOLVED').length}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4">
          <p className="text-xs uppercase tracking-wide text-slate-500">
            Today&apos;s Usage
          </p>
          <p className="mt-2 text-2xl font-bold">1234 kWh</p>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
