import type { Metadata } from "next"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Careers at VICON - Join Our Fire Protection Team",
  description: "Join VICON Technologies as a sales agent, distributor, or influencer. Help homeowners protect what matters most with cutting-edge fire protection technology. Apply today.",
  alternates: { canonical: '/careers' },
  openGraph: {
    title: 'Careers at VICON - Join Our Fire Protection Team',
    description: 'Join VICON Technologies as a sales agent, distributor, or influencer. Help protect homes with cutting-edge fire protection technology.',
    url: '/careers',
  },
  twitter: {
    title: 'Careers at VICON - Join Our Fire Protection Team',
    description: 'Join VICON Technologies as a sales agent, distributor, or influencer.',
  },
}

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'Careers', url: 'https://vicontech.group/careers' },
      ]} />
      {children}
    </>
  )
}
