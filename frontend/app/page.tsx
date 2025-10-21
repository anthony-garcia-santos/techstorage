"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Star, Zap, Truck, Shield } from "lucide-react"
import ProductCard from "@/components/product-card"

const featuredProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1299,
    image: "/iphone-15-pro-smartphone.jpg",
    rating: 4.8,
    reviews: 324,
    category: "phones",
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    price: 2499,
    image: "/macbook-pro-laptop.jpg",
    rating: 4.9,
    reviews: 512,
    category: "laptops",
  },
  {
    id: 3,
    name: "AirPods Pro Max",
    price: 549,
    image: "/airpods-pro-max-headphones.jpg",
    rating: 4.7,
    reviews: 289,
    category: "accessories",
  },
  {
    id: 4,
    name: "iPad Air",
    price: 799,
    image: "/ipad-air-tablet.jpg",
    rating: 4.6,
    reviews: 198,
    category: "tablets",
  },
]

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-balance">Tecnologia Premium ao Seu Alcance</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto text-balance">
            Descubra os melhores produtos de tecnologia com preços competitivos e entrega rápida
          </p>
          <Link href="/products">
            <Button size="lg" variant="secondary">
              Explorar Produtos
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-accent/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Truck className="text-accent" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Entrega Rápida</h3>
              <p className="text-muted-foreground">Entrega em até 2 dias úteis</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="text-accent" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Garantia</h3>
              <p className="text-muted-foreground">Garantia de 2 anos em todos os produtos</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="text-accent" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Melhor Preço</h3>
              <p className="text-muted-foreground">Preços competitivos garantidos</p>
            </div>
            <div className="text-center">
              <div className="bg-accent/20 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="text-accent" size={32} />
              </div>
              <h3 className="font-bold text-lg mb-2">Avaliações</h3>
              <p className="text-muted-foreground">Clientes satisfeitos e confiáveis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Produtos em Destaque</h2>
            <p className="text-muted-foreground">Confira nossos produtos mais populares</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-accent text-accent-foreground py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para Começar?</h2>
          <p className="text-lg opacity-90 mb-8">Crie sua conta e aproveite ofertas exclusivas</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Criar Conta
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-accent-foreground text-accent-foreground hover:bg-accent-foreground/10 bg-transparent"
              >
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
