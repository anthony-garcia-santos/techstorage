"use client"

import { useState, useMemo } from "react"
import { useProducts } from "@/lib/contextos/produtos-context"
import ProductCard from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, X } from "lucide-react"

const categories = [
  { id: "all", name: "Todos" },
  { id: "phones", name: "Celulares" },
  { id: "laptops", name: "Laptops" },
  { id: "tablets", name: "Tablets" },
  { id: "accessories", name: "Acessórios" },
  { id: "wearables", name: "Wearables" },
]

export default function ProductsPage() {
  const { products } = useProducts()
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 })

  const filteredProducts = useMemo(() => {
    let result = products

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Filter by price range
    result = result.filter((p) => p.price >= priceRange.min && p.price <= priceRange.max)

    // Sort
    if (sortBy === "featured") {
      result.sort((a, b) => {
        // Featured products come first
        if (a.featured && !b.featured) return -1
        if (!a.featured && b.featured) return 1
        // Then sort by rating
        return b.rating - a.rating
      })
    } else if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [products, selectedCategory, searchQuery, priceRange, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Nossos Produtos</h1>
          <p className="text-muted-foreground">Encontre o produto perfeito para você</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            {/* Search */}
            <div>
              <h3 className="font-bold text-lg mb-4">Buscar</h3>
              <div className="relative">
                <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-bold text-lg mb-4">Faixa de Preço</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm text-muted-foreground">Mínimo: ${priceRange.min}</label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange.min}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Máximo: ${priceRange.max}</label>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Categories */}
            <div>
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
                <button
                  onClick={() => setSortBy("featured")}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                    sortBy === "featured" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  Destaque
                </button>
                <button
                  onClick={() => setSortBy("price-low")}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                    sortBy === "price-low" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  Menor Preço
                </button>
                <button
                  onClick={() => setSortBy("price-high")}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                    sortBy === "price-high" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  Maior Preço
                </button>
                <button
                  onClick={() => setSortBy("rating")}
                  className={`block w-full text-left px-4 py-2 rounded-lg transition ${
                    sortBy === "rating" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  Melhor Avaliação
                </button>
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
                <p className="text-muted-foreground text-lg mb-4">Nenhum produto encontrado</p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("all")
                    setPriceRange({ min: 0, max: 5000 })
                  }}
                >
                  Limpar Filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
