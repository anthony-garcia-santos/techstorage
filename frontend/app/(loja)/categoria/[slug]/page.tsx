"use client"

import { use } from "react"
import { useProducts } from "@/lib/contextos/produtos-context"
import ProductCard from "@/components/product-card"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const categoryNames: Record<string, string> = {
  phones: "Celulares",
  laptops: "Laptops",
  tablets: "Tablets",
  accessories: "Acessórios",
  wearables: "Wearables",
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const { products } = useProducts()

  const categoryProducts = products.filter((p) => p.category === slug)
  const categoryName = categoryNames[slug] || slug

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link href="/products" className="flex items-center gap-2 text-primary hover:opacity-80 mb-8">
          <ArrowLeft size={20} />
          Voltar
        </Link>

        <h1 className="text-4xl font-bold mb-2">{categoryName}</h1>
        <p className="text-muted-foreground mb-8">{categoryProducts.length} produtos encontrados</p>

        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground text-lg">Nenhum produto nesta categoria</p>
          </Card>
        )}
      </div>
    </div>
  )
}
