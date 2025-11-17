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
    image: "/mmexport1763001236323.jpg",
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
    image: "/mmexport1763001233812.jpg",
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
    image: "/mmexport1763001229545.jpg",
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
    name: "Backup Home Battery System",
    description: "Power continuity for safety systems and essential equipment during outages",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%88%AA%E5%B1%8F2025-06-13-18.16.37-Qoo2vaGfIkOj8ODsDYcAVekpBlXeeu.png",
    price: 5999,
    agentPrice: 4799.2, // 20% discount
    features: [
      "Keeps fire systems operational during outages",
      "Powers essential home equipment",
      "Long-duration backup capacity",
      "Seamless integration with VICON",
      "UPS-grade reliability",
      "10-year warranty",
    ],
    specs: "Capacity: 13.5 kWh | Continuous power support | UPS-grade reliability | Silent operation",
  },
]
