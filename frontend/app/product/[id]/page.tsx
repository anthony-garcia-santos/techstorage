"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from "lucide-react"

const products: Record<string, any> = {
  "1": {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1299,
    originalPrice: 1599,
    image: "/placeholder.svg?key=1r4xb",
    rating: 4.8,
    reviews: 324,
    category: "phones",
    description:
      "O iPhone 15 Pro oferece o melhor em tecnologia Apple com câmera avançada, processador A17 Pro e design premium.",
    specs: [
      { label: "Tela", value: '6.1" Super Retina XDR' },
      { label: "Processador", value: "A17 Pro" },
      { label: "Câmera", value: "48MP Principal" },
      { label: "Bateria", value: "Até 29 horas" },
      { label: "Armazenamento", value: "256GB" },
    ],
    inStock: true,
  },
  "2": {
    id: 2,
    name: 'MacBook Pro 16"',
    price: 2499,
    originalPrice: 2999,
    image: "/placeholder.svg?key=zts9p",
    rating: 4.9,
    reviews: 512,
    category: "laptops",
    description:
      'MacBook Pro 16" com chip M3 Max, perfeito para profissionais que precisam de poder de processamento máximo.',
    specs: [
      { label: "Tela", value: '16" Liquid Retina XDR' },
      { label: "Processador", value: "M3 Max" },
      { label: "RAM", value: "36GB" },
      { label: "Armazenamento", value: "1TB SSD" },
      { label: "Bateria", value: "Até 22 horas" },
    ],
    inStock: true,
  },
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = products[params.id]
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Link href="/products">
            <Button>Voltar para Produtos</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-foreground">
            Produtos
          </Link>
          <span>/</span>
          <span>{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <div className="bg-muted rounded-lg overflow-hidden mb-4">
              <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-96 object-cover" />
            </div>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-20 h-20 bg-muted rounded-lg cursor-pointer hover:ring-2 ring-primary"></div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={i < Math.floor(product.rating) ? "fill-accent text-accent" : "text-muted"}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">({product.reviews} avaliações)</span>
              </div>
              <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
              <p className="text-muted-foreground text-lg mb-6">{product.description}</p>
            </div>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-primary">${product.price}</span>
                <span className="text-xl text-muted-foreground line-through">${product.originalPrice}</span>
                <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-bold">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="mb-8 space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantidade:</span>
                <div className="flex items-center border border-border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-secondary"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-bold">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 hover:bg-secondary">
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1" size="lg">
                  <ShoppingCart size={20} className="mr-2" />
                  Adicionar ao Carrinho
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={isFavorite ? "border-accent text-accent" : ""}
                >
                  <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 size={20} />
                </Button>
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-8 pb-8 border-b border-border">
              <div className="flex items-center gap-3">
                <Truck className="text-accent" size={24} />
                <div>
                  <p className="font-medium">Entrega Rápida</p>
                  <p className="text-sm text-muted-foreground">Entrega em até 2 dias úteis</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="text-accent" size={24} />
                <div>
                  <p className="font-medium">Garantia de 2 Anos</p>
                  <p className="text-sm text-muted-foreground">Cobertura completa</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="text-accent" size={24} />
                <div>
                  <p className="font-medium">Devolução Fácil</p>
                  <p className="text-sm text-muted-foreground">30 dias para devolver</p>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div>
              <h3 className="font-bold text-lg mb-4">Especificações</h3>
              <div className="space-y-3">
                {product.specs.map((spec: any, i: number) => (
                  <div key={i} className="flex justify-between py-2 border-b border-border/50">
                    <span className="text-muted-foreground">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
