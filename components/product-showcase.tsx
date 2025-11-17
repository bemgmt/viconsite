"use client"

import ProductCard from "@/components/product-card"
import type { Product } from "@/lib/products"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

interface ProductShowcaseProps {
  products: Product[]
}

export default function ProductShowcase({ products }: ProductShowcaseProps) {

  return (
    <>
      {/* Desktop: Grid layout */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} price={product.price} />
        ))}
      </div>

      {/* Mobile: Horizontal scroll carousel */}
      <div className="md:hidden mb-12">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {products.map((product) => (
              <CarouselItem key={product.id} className="pl-4 basis-[85%]">
                <ProductCard product={product} price={product.price} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
      </div>
    </>
  )
}
