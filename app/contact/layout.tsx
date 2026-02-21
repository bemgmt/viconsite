import type { Metadata } from "next"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"

export const metadata: Metadata = {
  title: "Contact VICON - Schedule Free Fire Protection Consultation",
  description: "Schedule your free consultation with VICON fire protection specialists. Get a customized system design for your property. Serving Southern California. Call (904) 945-3280.",
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact VICON - Schedule Free Consultation',
    description: 'Schedule a free consultation with VICON fire protection specialists. Free on-site assessment, customized plans, financing options. Call (904) 945-3280.',
    url: '/contact',
  },
  twitter: {
    title: 'Contact VICON - Schedule Free Consultation',
    description: 'Schedule a free consultation with VICON fire protection specialists. Call (904) 945-3280.',
  },
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'Contact', url: 'https://vicontech.group/contact' },
      ]} />
      {children}
    </>
  )
}
