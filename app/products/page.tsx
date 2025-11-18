import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import ProductsContent from "@/components/products-content"

export const metadata = {
  title: "VICON Products - Fire Protection Systems",
  description: "Browse VICON intelligent fire protection systems and backup battery solutions",
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
