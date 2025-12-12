const AlertsPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Alerts</h1>
      <p className="text-slate-600 text-sm">
        Open, in-progress, and resolved issues that need review or remediation.
      </p>

      <div className="flex flex-wrap gap-2 text-xs">
        <button className="rounded-full border border-slate-300 px-3 py-1 bg-slate-900 text-white">
          All
        </button>
        <button className="rounded-full border border-slate-300 px-3 py-1">
          Open
        </button>
        <button className="rounded-full border border-slate-300 px-3 py-1">
          In progress
        </button>
        <button className="rounded-full border border-slate-300 px-3 py-1">
          Resolved
        </button>
      </div>

      <div className="bg-white rounded-xl shadow divide-y">
        <div className="p-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium">High overnight usage</p>
            <p className="text-xs text-slate-500">
              Main Street Cafe • Detected 2:15 AM • 3× baseline usage
            </p>
          </div>
          <span className="inline-flex rounded-full bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700">
            HIGH • Open
          </span>
        </div>
        <div className="p-4 flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium">Cooling running after hours</p>
            <p className="text-xs text-slate-500">
              Riverside Office Park • Detected yesterday
            </p>
          </div>
          <span className="inline-flex rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
            MED • In progress
          </span>
        </div>
      </div>
    </div>
  )
}

export default AlertsPage
