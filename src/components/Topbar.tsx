import { Search, Sparkles } from 'lucide-react'

const Topbar = () => {
  return (
    <header className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 px-4 py-3 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 text-sm text-slate-600">
        <Sparkles size={18} className="text-indigo-600" />
        <span className="font-medium text-slate-900">Live demo UI</span>
        <span className="hidden sm:inline">•</span>
        <span className="hidden sm:inline">React + Tailwind</span>
      </div>

      <div className="hidden sm:flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 w-80">
        <Search size={16} className="text-slate-400" />
        <input
          className="w-full outline-none"
          placeholder="Search buildings, alerts…"
        />
      </div>
    </header>
  )
}

export default Topbar
