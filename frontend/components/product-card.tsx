"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"

interface Product {
  id: number
  name: string
  price: number
  image: string
  rating: number
  reviews: number
  category: string
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-muted overflow-hidden group">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute top-2 right-2 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
          -20%
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">({product.reviews})</span>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-2xl font-bold text-primary">${product.price}</p>
            <p className="text-sm text-muted-foreground line-through">${Math.round(product.price * 1.25)}</p>
          </div>
        </div>
        <Link href={`/product/${product.id}`}>
          <Button className="w-full" size="sm">
            <ShoppingCart size={18} className="mr-2" />
            Ver Detalhes
          </Button>
        </Link>
      </div>
    </Card>
  )
}
