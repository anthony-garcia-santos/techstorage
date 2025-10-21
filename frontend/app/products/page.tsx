"use client"

import { useState } from "react"
import ProductCard from "@/components/product-card"

const allProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    price: 1299,
    image: "/placeholder.svg?key=1r4xb",
    rating: 4.8,
    reviews: 324,
    category: "phones",
  },
  {
    id: 2,
    name: 'MacBook Pro 16"',
    price: 2499,
    image: "/placeholder.svg?key=zts9p",
    rating: 4.9,
    reviews: 512,
    category: "laptops",
  },
  {
    id: 3,
    name: "AirPods Pro Max",
    price: 549,
    image: "/placeholder.svg?key=9onyx",
    rating: 4.7,
    reviews: 289,
    category: "accessories",
  },
  {
    id: 4,
    name: "iPad Air",
    price: 799,
    image: "/placeholder.svg?key=byo1z",
    rating: 4.6,
    reviews: 198,
    category: "tablets",
  },
  {
    id: 5,
    name: "Apple Watch Series 9",
    price: 399,
    image: "/placeholder.svg?key=watch1",
    rating: 4.5,
    reviews: 156,
    category: "wearables",
  },
  {
    id: 6,
    name: "Samsung Galaxy S24",
    price: 999,
    image: "/placeholder.svg?key=samsung1",
    rating: 4.7,
    reviews: 287,
    category: "phones",
  },
  {
    id: 7,
    name: "Dell XPS 15",
    price: 1899,
    image: "/placeholder.svg?key=dell1",
    rating: 4.6,
    reviews: 203,
    category: "laptops",
  },
  {
    id: 8,
    name: "Sony WH-1000XM5",
    price: 399,
    image: "/placeholder.svg?key=sony1",
    rating: 4.8,
    reviews: 445,
    category: "accessories",
  },
]

const categories = [
  { id: "all", name: "Todos" },
  { id: "phones", name: "Celulares" },
  { id: "laptops", name: "Laptops" },
  { id: "tablets", name: "Tablets" },
  { id: "accessories", name: "Acessórios" },
  { id: "wearables", name: "Wearables" },
]

const sortOptions = [
  { id: "featured", name: "Destaque" },
  { id: "price-low", name: "Menor Preço" },
  { id: "price-high", name: "Maior Preço" },
  { id: "rating", name: "Melhor Avaliação" },
]

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = allProducts.filter((p) => selectedCategory === "all" || p.category === selectedCategory)

  if (sortBy === "price-low") {
    filteredProducts.sort((a, b) => a.price - b.price)
  } else if (sortBy === "price-high") {
    filteredProducts.sort((a, b) => b.price - a.price)
  } else if (sortBy === "rating") {
    filteredProducts.sort((a, b) => b.rating - a.rating)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Nossos Produtos</h1>
          <p className="text-muted-foreground">Encontre o produto perfeito para você</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64">
            <div className="lg:block">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-bold text-lg mb-4">Categorias</h3>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                        selectedCategory === cat.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-bold text-lg mb-4">Ordenar por</h3>
                <div className="space-y-2">
                  {sortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setSortBy(opt.id)}
                      className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                        sortBy === opt.id ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                      }`}
                    >
                      {opt.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="mb-6 flex justify-between items-center">
              <p className="text-muted-foreground">Mostrando {filteredProducts.length} produtos</p>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">Nenhum produto encontrado</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
