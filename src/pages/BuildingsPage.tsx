import { buildings } from '../data/mockData'

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
            {buildings.map((building) => (
              <tr key={building.id} className="border-t">
                <td className="px-4 py-2 font-medium">
                  {building.name}
                </td>
                <td className="px-4 py-2">
                  {building.address}
                </td>
                <td className="px-4 py-2">
                  {building.type}
                </td>
                <td className="px-4 py-2">
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                    Normal
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BuildingsPage
