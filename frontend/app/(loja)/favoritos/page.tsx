"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart } from "lucide-react"
import { useProducts } from "@/lib/contextos/produtos-context"

export default function FavoritesPage() {
  const { products } = useProducts()
  const [favorites, setFavorites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites")
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites))
    }
    setIsLoading(false)
  }, [])

  const favoriteProducts = products.filter((p) => favorites.includes(p.id))

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((fav) => fav !== id)
    setFavorites(updated)
    localStorage.setItem("favorites", JSON.stringify(updated))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Carregando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Meus Favoritos</h1>
          <p className="text-muted-foreground">{favoriteProducts.length} produtos salvos</p>
        </div>

        {favoriteProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto text-muted mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-4">Nenhum favorito ainda</h2>
            <p className="text-muted-foreground mb-8">Comece a adicionar produtos aos seus favoritos</p>
            <Link href="/(loja)/produtos">
              <Button size="lg">Explorar Produtos</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {favoriteProducts.map((product) => (
              <div
                key={product.id}
                className="bg-card rounded-lg border border-border overflow-hidden hover:shadow-lg transition"
              >
                <div className="relative bg-muted h-48 overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition"
                  />
                  <button
                    onClick={() => removeFavorite(product.id)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
                  >
                    <Heart size={20} fill="currentColor" />
                  </button>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                  <Link href={`/(loja)/produto/${product.id}`}>
                    <Button className="w-full" size="sm">
                      <ShoppingCart size={16} className="mr-2" />
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
