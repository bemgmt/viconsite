import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers at VICON - Join Our Fire Protection Team",
  description: "Join VICON Technologies as a sales agent, distributor, or influencer. Help homeowners protect what matters most with cutting-edge fire protection technology. Apply today.",
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
