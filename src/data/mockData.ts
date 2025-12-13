export type Building = {
  id: string
  name: string
  address: string
  type: 'Retail' | 'Office' | 'Warehouse'
}

export type AlertStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'
export type Severity = 'LOW' | 'MEDIUM' | 'HIGH'

export type Alert = {
  id: string
  buildingId: string
  title: string
  description: string
  severity: Severity
  status: AlertStatus
  createdAt: string
  updatedAt: string
}

export const buildings: Building[] = [
  {
    id: 'b1',
    name: 'Main Street Cafe',
    address: '123 Main St, Boston, MA',
    type: 'Retail',
  },
  {
    id: 'b2',
    name: 'Riverside Office Park',
    address: '456 River Rd, Concord, MA',
    type: 'Office',
  },
  {
    id: 'b3',
    name: 'North Hub Warehouse',
    address: '89 Industrial Ave, Lowell, MA',
    type: 'Warehouse',
  },
  {
  id: 'b4',
  name: 'Downtown Library',
  address: '77 Elm St, Cambridge, MA',
  type: 'Office',
},

]

export const initialAlerts: Alert[] = [
  {
    id: 'a1',
    buildingId: 'b1',
    title: 'High overnight usage',
    description: 'Usage between 1–4 AM is ~3× the normal baseline.',
    severity: 'HIGH',
    status: 'OPEN',
    createdAt: '2025-12-10T02:15:00Z',
    updatedAt: '2025-12-10T02:15:00Z',
  },
  {
    id: 'a2',
    buildingId: 'b2',
    title: 'Cooling running after hours',
    description: 'HVAC appears active after business hours for 2 nights.',
    severity: 'MEDIUM',
    status: 'IN_PROGRESS',
    createdAt: '2025-12-09T22:05:00Z',
    updatedAt: '2025-12-10T01:12:00Z',
  },
  {
    id: 'a3',
    buildingId: 'b3',
    title: 'Sensor gap detected',
    description: 'No readings received for 35 minutes from meter MTR-019.',
    severity: 'LOW',
    status: 'OPEN',
    createdAt: '2025-12-10T14:40:00Z',
    updatedAt: '2025-12-10T14:40:00Z',
  },
  
]
