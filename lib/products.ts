// Product data with pricing for public and agent versions
export interface Product {
  id: string
  name: string
  description: string
  image: string
  price: number
  agentPrice: number
  features: string[]
  specs: string
}

export const products: Product[] = [
  {
    id: "intelligent-sprinkler-system",
    name: "VICON Intelligent Sprinkler System",
    description: "Complete intelligent fire suppression system with smart cannon nozzle, jet rod kit, control host, and wireless remote",
    image: "/nozzle2.jpg",
    price: 18600,
    agentPrice: 14880, // 20% discount
    features: [
      "VICON Smart Cannon Nozzle",
      "VICON Single-Column Jet Rod Kit",
      "VICON Intelligent Spray System Control Host",
      "Wireless Remote-Control",
      "Stainless-steel quick-connect inlet/outlet piping",
      "Power supply system",
    ],
    specs: "Complete System | Spray Distance: 82-98 ft | Flow: 35.2 gpm | Power: 10 HP | Voltage: 220 V | Pressure: 145 psi",
  },
  {
    id: "water-tank-5ton",
    name: "5-Ton Water Storage Tank",
    description: "Compact water storage tank providing ~45 minutes of continuous spray time",
    image: "/watertank2.jpg",
    price: 3600,
    agentPrice: 2880, // 20% discount
    features: [
      "1,453 gallon capacity",
      "Dimensions: 78 in × 79 in (6.5 ft × 6.6 ft)",
      "Continuous spray time: ~45 minutes",
      "Compact design",
      "Weather-resistant construction",
      "Compatible with VICON fire protection systems",
    ],
    specs: "Capacity: 1,453 gallons | Dimensions: 78\" × 79\" (6.5 ft × 6.6 ft) | Spray Time: ~45 minutes",
  },
  {
    id: "water-tank-16ton",
    name: "16-Ton Water Storage Tank",
    description: "Large capacity water storage tank providing ~3 hours of continuous spray time",
    image: "/watertank1.jpg",
    price: 6250,
    agentPrice: 5000, // 20% discount
    features: [
      "4,386 gallon capacity",
      "Dimensions: 14 ft × 8 ft × 5 ft",
      "Continuous spray time: ~3 hours",
      "Durable construction",
      "Weather-resistant design",
      "Compatible with VICON fire protection systems",
    ],
    specs: "Capacity: 4,386 gallons | Dimensions: 14 ft × 8 ft × 5 ft | Spray Time: ~3 hours",
  },
  {
    id: "swimming-pool-system",
    name: "VICON Intelligent Sprinkler Swimming Pool System",
    description: "High-performance pump system for pool-integrated fire suppression",
    image: "/inground3.jpg",
    price: 8500,
    agentPrice: 6800, // 20% discount
    features: [
      "Dimensions: 59.1 in × 25.2 in × 50.6 in (4.9 ft × 2.1 ft × 4.2 ft)",
      "10 HP stainless steel pump",
      "Max flow: 35.2 gpm",
      "Head: 361 ft",
      "Pressure: 174 psi",
      "220 V, 21.3 A, 3480 RPM",
    ],
    specs: "Dimensions: 59.1\" × 25.2\" × 50.6\" | Power: 10 HP | Flow: 35.2 gpm | Head: 361 ft | Pressure: 174 psi | Voltage: 220 V",
  },
  {
    id: "backup-battery",
    name: "Sanctuary Battery",
    description: "Scalable lithium iron phosphate battery system with integrated 12kW inverter for whole-home backup power",
    image: "/batteryblack1.jpg",
    price: 12800,
    agentPrice: 10240, // 20% discount
    features: [
      "16kWh capacity (expandable to 60kWh)",
      "Integrated 12kW inverter with grid-interactive capability",
      "Lithium Iron Phosphate (LiFePO4) battery technology",
      "Wide operating temperature: -4°F to 131°F",
      "Flood and dust resistant design",
      "System expansion available anytime",
      "Meets North American safety and EMI standards",
      "96.5% max efficiency",
    ],
    specs: "Capacity: 16kWh (expandable to 60kWh) | Inverter: 12kW continuous, 13.2kW peak | Battery: LiFePO4 51.2V | Dimensions: 45\" x 18.5\" x 10.45\" | Weight: 290 lbs | Temp Range: -4°F to 131°F",
  },
]
