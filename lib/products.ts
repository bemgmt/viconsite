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
    id: "vk-240",
    name: "VK-240-25-3000 Single-Column Jet Rod Kit",
    description: "Wireless remote-controlled fire suppression system with stainless steel construction",
    image: "/nozzle2.jpg",
    price: 4299,
    agentPrice: 3439.2, // 20% discount
    features: [
      "Wireless remote controller (500m range)",
      "Stainless steel material",
      "Pressure: 1.2 MPA",
      "24V voltage operation",
      "DN50-DN80 flange compatibility",
      "Size: 3000×100mm",
    ],
    specs: "Voltage: 24V | Control: Wireless (500m) | Material: Stainless Steel | Pressure: 1.2 MPA | Interface: DN50 (2 inch)",
  },
  {
    id: "vk-product-2",
    name: "VICON Fire Protection System - Model 2",
    description: "Advanced fire suppression system with intelligent monitoring",
    image: "/inground3.jpg",
    price: 3799,
    agentPrice: 3039.2, // 20% discount
    features: [
      "Intelligent fire detection",
      "Automatic suppression activation",
      "Real-time monitoring",
      "Remote control capability",
      "Weather-resistant design",
      "Professional installation included",
    ],
    specs: "Advanced monitoring | Automatic activation | Weather-resistant | Remote control enabled",
  },
  {
    id: "vk-product-3",
    name: "VICON Fire Protection System - Model 3",
    description: "Compact fire suppression solution for residential and commercial use",
    image: "/dualconsole1.jpg",
    price: 3299,
    agentPrice: 2639.2, // 20% discount
    features: [
      "Compact design",
      "Easy installation",
      "Smart detection technology",
      "Rapid response system",
      "Low maintenance",
      "Energy efficient",
    ],
    specs: "Compact design | Smart detection | Rapid response | Energy efficient operation",
  },
  {
    id: "backup-battery",
    name: "Sanctuary Battery System - 16kWh",
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
