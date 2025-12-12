import { NavLink, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import BuildingsPage from './pages/BuildingsPage'
import AlertsPage from './pages/AlertsPage'

function App() {
  return (
    <div className="min-h-screen flex bg-slate-100">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 flex-col bg-white border-r">
        <div className="px-4 py-3 border-b">
          <h1 className="text-lg font-bold tracking-tight">BuildingPulse</h1>
          <p className="text-xs text-slate-500">
            Energy & alerts for multi-site buildings
          </p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${
                isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/buildings"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${
                isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            Buildings
          </NavLink>
          <NavLink
            to="/alerts"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-lg ${
                isActive ? 'bg-slate-900 text-white' : 'text-slate-700 hover:bg-slate-100'
              }`
            }
          >
            Alerts
          </NavLink>
        </nav>
        <div className="px-4 py-3 border-t text-xs text-slate-500">
          Demo UI for energy & alert monitoring
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 min-w-0">
        {/* Mobile header */}
        <header className="md:hidden bg-white border-b px-4 py-3">
          <h1 className="text-base font-semibold">BuildingPulse</h1>
        </header>

        <div className="p-4 max-w-6xl mx-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/buildings" element={<BuildingsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default App
