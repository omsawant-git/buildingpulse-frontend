import { Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import BuildingsPage from './pages/BuildingsPage'
import AlertsPage from './pages/AlertsPage'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid md:grid-cols-[260px_1fr] gap-4">
          <Sidebar />

          <main className="space-y-4">
            <Topbar />

            <div className="rounded-2xl bg-white/60 ring-1 ring-slate-200 p-4 backdrop-blur">
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/buildings" element={<BuildingsPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
