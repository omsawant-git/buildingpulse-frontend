const BuildingsPage = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Buildings</h1>
      <p className="text-slate-600 text-sm">
        List of locations being monitored for energy and comfort.
      </p>
      <div className="bg-white rounded-xl shadow overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-2 text-left font-semibold text-slate-600">
                Name
              </th>
              <th className="px-4 py-2 text-left font-semibold text-slate-600">
                Address
              </th>
              <th className="px-4 py-2 text-left font-semibold text-slate-600">
                Type
              </th>
              <th className="px-4 py-2 text-left font-semibold text-slate-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Main Street Cafe</td>
              <td className="px-4 py-2">123 Main St, Boston, MA</td>
              <td className="px-4 py-2">Retail</td>
              <td className="px-4 py-2">
                <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                  Normal
                </span>
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Riverside Office Park</td>
              <td className="px-4 py-2">456 River Rd, Concord, MA</td>
              <td className="px-4 py-2">Office</td>
              <td className="px-4 py-2">
                <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700">
                  Alerts
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BuildingsPage
