import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProductsContent from "@/components/products-content"

export const metadata = {
  title: "VICON Products - Residential Fire Sprinkler Systems",
  description: "Browse VICON residential fire sprinkler systems, outdoor fire sprinkler systems, and exterior fire sprinkler systems. Professional installation included.",
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <ProductsContent />
      <Footer />
    </main>
  )
}
