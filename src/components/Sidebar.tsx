import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Building2, BellRing } from 'lucide-react'

const navItem =
  'flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition'

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 flex-col">
      <div className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 p-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-sky-500" />
          <div>
            <p className="text-sm font-semibold text-slate-900">BuildingPulse</p>
            <p className="text-xs text-slate-500">Energy & alerts monitoring</p>
          </div>
        </div>

        <nav className="mt-4 space-y-1">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${navItem} ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            <LayoutDashboard size={18} />
            Dashboard
          </NavLink>

          <NavLink
            to="/buildings"
            className={({ isActive }) =>
              `${navItem} ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            <Building2 size={18} />
            Buildings
          </NavLink>

          <NavLink
            to="/alerts"
            className={({ isActive }) =>
              `${navItem} ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-700 hover:bg-slate-50'
              }`
            }
          >
            <BellRing size={18} />
            Alerts
          </NavLink>
        </nav>
      </div>

      <div className="mt-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-sky-600 p-4 text-white shadow-sm">
        <p className="text-sm font-semibold">Demo ready</p>
        <p className="mt-1 text-xs text-white/80">
          Search, filters, severity badges, and status updates.
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
