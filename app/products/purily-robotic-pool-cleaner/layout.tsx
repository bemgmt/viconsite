import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VICON Intelligent Robotic Pool Cleaner | Autonomous Water Maintenance",
  description: "VICON is a fully autonomous, app-controlled robotic pool cleaner for floors, walls, and waterlines. Intelligent navigation, high-efficiency filtration, and OTA updates for year-round water hygiene.",
  alternates: { canonical: '/products/purily-robotic-pool-cleaner' },
  openGraph: {
    title: 'VICON Intelligent Robotic Pool Cleaner',
    description: 'Fully autonomous, app-controlled robotic pool cleaner. Intelligent navigation, high-efficiency filtration, and OTA updates.',
    url: '/products/purily-robotic-pool-cleaner',
  },
  twitter: {
    title: 'VICON Intelligent Robotic Pool Cleaner',
    description: 'Fully autonomous, app-controlled robotic pool cleaner with intelligent navigation and high-efficiency filtration.',
  },
}

export default function PurilyRoboticPoolCleanerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
