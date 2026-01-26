import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VICON Intelligent Robotic Pool Cleaner | Autonomous Water Maintenance",
  description: "VICON is a fully autonomous, app-controlled robotic pool cleaner for floors, walls, and waterlines. Intelligent navigation, high-efficiency filtration, and OTA updates for year-round water hygiene.",
}

export default function PurilyRoboticPoolCleanerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
