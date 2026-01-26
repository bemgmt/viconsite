import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sanctuary Battery System - 14.3kWh Backup Power | VICON",
  description: "VICON Sanctuary Battery System - 14.3kWh base system, scalable to 60kWh. LiFePO4 technology, grid-interactive, powers fire protection during outages. Starting at $12,800.",
}

export default function BatteryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
