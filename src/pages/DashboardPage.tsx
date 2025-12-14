import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { buildings, initialAlerts } from '../data/mockData'
import StatCard from '../components/StatCard'
import { Building2, BellRing, Zap } from 'lucide-react'

const usage = [
  { day: 'Mon', kwh: 980 },
  { day: 'Tue', kwh: 1100 },
  { day: 'Wed', kwh: 1040 },
  { day: 'Thu', kwh: 1205 },
  { day: 'Fri', kwh: 1160 },
  { day: 'Sat', kwh: 930 },
  { day: 'Sun', kwh: 1015 },
]

const DashboardPage = () => {
  const activeAlerts = initialAlerts.filter((a) => a.status !== 'RESOLVED').length

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
        <p className="text-sm text-slate-600">
          Overview of buildings, energy usage, and alert workload.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Buildings"
          value={`${buildings.length}`}
          helper="Sites monitored"
          tone="indigo"
          icon={<Building2 size={20} />}
        />
        <StatCard
          label="Active Alerts"
          value={`${activeAlerts}`}
          helper="Needs attention"
          tone="rose"
          icon={<BellRing size={20} />}
        />
        <StatCard
          label="Weekly Usage"
          value="7,430 kWh"
          helper="+6% vs last week"
          tone="emerald"
          icon={<Zap size={20} />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-900">Energy trend</p>
          <p className="text-xs text-slate-500">Last 7 days (demo)</p>

          <div className="h-52 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={usage} margin={{ left: 8, right: 8, top: 10 }}>
                <XAxis dataKey="day" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} width={34} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="kwh"
                  strokeWidth={2}
                  fillOpacity={0.25}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-4">
          <p className="text-sm font-semibold text-slate-900">Recent alerts</p>
          <p className="text-xs text-slate-500">Most recent issues (demo)</p>

          <div className="mt-3 space-y-2">
            {initialAlerts.slice(0, 3).map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-slate-200 bg-white px-3 py-3 hover:bg-slate-50 transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{a.title}</p>
                    <p className="text-xs text-slate-500">{a.description}</p>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      a.severity === 'HIGH'
                        ? 'bg-rose-100 text-rose-700'
                        : a.severity === 'MEDIUM'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-emerald-100 text-emerald-700'
                    }`}
                  >
                    {a.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
