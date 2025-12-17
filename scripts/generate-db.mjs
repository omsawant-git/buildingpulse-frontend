import fs from "fs"

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6D2B79F5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const rand = mulberry32(42)

const pick = (arr) => arr[Math.floor(rand() * arr.length)]
const int = (min, max) => Math.floor(rand() * (max - min + 1)) + min

const buildingTypes = ["Retail", "Office", "Warehouse"]

const cityPool = [
  "Boston, MA",
  "Cambridge, MA",
  "Worcester, MA",
  "Somerville, MA",
  "Lowell, MA",
  "Quincy, MA",
  "Newton, MA",
  "Framingham, MA",
]

const namePool = {
  Retail: ["Main Street Cafe", "Harbor Market", "Elm Pharmacy", "City Bakery", "Riverside Deli"],
  Office: ["Riverside Office Park", "Downtown HQ", "Innovation Center", "Tech Plaza", "Central Towers"],
  Warehouse: ["North Hub Warehouse", "Distribution Depot", "Logistics Center", "Supply Yard", "East Storage"],
}

const alertTitles = [
  "High overnight usage",
  "Cooling running after hours",
  "Sensor gap detected",
  "Abnormal weekend spike",
  "Heating short-cycling",
  "Demand peak event",
  "Potential equipment fault",
  "Baseline drift detected",
]

const alertDescriptions = [
  "Usage deviates significantly from baseline for this time window.",
  "HVAC appears active outside scheduled operating hours.",
  "No readings received for an extended period from a meter device.",
  "Unusual load increase compared to historical weekend behavior.",
  "Rapid cycling detected; may indicate control or equipment issue.",
  "Short-duration peak suggests demand event or simultaneous loads.",
  "Pattern indicates possible fault; recommend inspection.",
  "Baseline has shifted; verify schedules and occupancy assumptions.",
]

const severityWeighted = () => {
  const r = rand()
  if (r < 0.2) return "HIGH"
  if (r < 0.55) return "MEDIUM"
  return "LOW"
}

const statusWeighted = () => {
  const r = rand()
  if (r < 0.55) return "OPEN"
  if (r < 0.85) return "IN_PROGRESS"
  return "RESOLVED"
}

const now = new Date()
const daysAgo = (d) => new Date(now.getTime() - d * 24 * 60 * 60 * 1000)

const iso = (d) => d.toISOString()

// ---- Buildings (20) ----
const buildings = Array.from({ length: 20 }).map((_, i) => {
  const type = pick(buildingTypes)
  const name = `${pick(namePool[type])} ${i + 1}`
  const address = `${int(10, 999)} ${pick(["Main", "Elm", "River", "Oak", "Pine", "Maple"])} St, ${pick(cityPool)}`
  return {
    id: `b${i + 1}`,
    name,
    address,
    type,
  }
})

// ---- Alerts (120) ----
const alerts = Array.from({ length: 120 }).map((_, i) => {
  const building = pick(buildings)
  const created = daysAgo(int(0, 29))
  const updated = new Date(created.getTime() + int(0, 72) * 60 * 60 * 1000)

  const status = statusWeighted()
  // If resolved, make updatedAt later (looks realistic)
  const updatedAt = status === "RESOLVED"
    ? new Date(created.getTime() + int(12, 120) * 60 * 60 * 1000)
    : updated

  return {
    id: `a${i + 1}`,
    buildingId: building.id,
    title: pick(alertTitles),
    description: pick(alertDescriptions),
    severity: severityWeighted(),
    status,
    createdAt: iso(created),
    updatedAt: iso(updatedAt),
  }
})

// ---- Usage (30 days per building = 600 records) ----
const usage = []
for (const b of buildings) {
  const base =
    b.type === "Retail" ? 900 :
    b.type === "Office" ? 1200 :
    700

  for (let d = 0; d < 30; d++) {
    const date = daysAgo(29 - d)
    const day = date.getDay() // 0 Sun .. 6 Sat
    const weekendFactor = (day === 0 || day === 6) ? 0.85 : 1.0
    const noise = int(-120, 140)

    const kwh = Math.max(200, Math.round((base * weekendFactor) + noise))
    usage.push({
      id: `u_${b.id}_${d + 1}`,
      buildingId: b.id,
      date: date.toISOString().slice(0, 10), // YYYY-MM-DD
      kwh,
    })
  }
}

const db = { buildings, alerts, usage }

fs.writeFileSync("db.json", JSON.stringify(db, null, 2))
console.log("✅ Generated db.json")
console.log(`Buildings: ${buildings.length}, Alerts: ${alerts.length}, Usage rows: ${usage.length}`)
