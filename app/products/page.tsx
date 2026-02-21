import Navigation from "@/components/navigation"
import BreadcrumbJsonLd from "@/components/breadcrumb-jsonld"
import Footer from "@/components/footer"
import ProductsContent from "@/components/products-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "VICON Products - Residential Fire Sprinkler Systems",
  description: "Browse VICON residential fire sprinkler systems, outdoor fire sprinkler systems, and exterior fire sprinkler systems. Professional installation included.",
  alternates: { canonical: '/products' },
  openGraph: {
    title: 'VICON Products - Residential Fire Sprinkler Systems',
    description: 'Browse VICON residential fire sprinkler systems, outdoor fire sprinkler systems, and exterior fire sprinkler systems. Professional installation included.',
    url: '/products',
  },
  twitter: {
    title: 'VICON Products - Residential Fire Sprinkler Systems',
    description: 'Browse VICON residential fire sprinkler systems, outdoor and exterior fire sprinkler systems. Professional installation included.',
  },
}

export default function ProductsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Home', url: 'https://vicontech.group' },
        { name: 'Products', url: 'https://vicontech.group/products' },
      ]} />
      <main className="min-h-screen bg-background">
      <Navigation />
      <ProductsContent />
      <Footer />
    </main>
    </>
  )
}
