"use client"

import { useState } from "react"
import { useProducts } from "@/lib/products-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Star } from "lucide-react"
import Link from "next/link"

export default function ComparePage() {
  const { products } = useProducts()
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  const addProduct = (id: string) => {
    if (selectedProducts.length < 3 && !selectedProducts.includes(id)) {
      setSelectedProducts([...selectedProducts, id])
    }
  }

  const removeProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter((p) => p !== id))
  }

  const comparedProducts = products.filter((p) => selectedProducts.includes(p.id))

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-2">Comparar Produtos</h1>
        <p className="text-muted-foreground mb-8">Compare até 3 produtos lado a lado</p>

        {selectedProducts.length === 0 ? (
          <Card className="p-12 text-center mb-8">
            <p className="text-muted-foreground text-lg mb-6">Selecione produtos para comparar</p>
            <Link href="/products">
              <Button>Ir para Produtos</Button>
            </Link>
          </Card>
        ) : (
          <div className="mb-8 overflow-x-auto">
            <div
              className="grid gap-4"
              style={{ gridTemplateColumns: `repeat(${selectedProducts.length}, minmax(250px, 1fr))` }}
            >
              {comparedProducts.map((product) => (
                <Card key={product.id} className="p-4 relative">
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="absolute top-2 right-2 p-1 hover:bg-secondary rounded-lg"
                  >
                    <X size={20} />
                  </button>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-accent" />
                      <span>
                        {product.rating} ({product.reviews} avaliações)
                      </span>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Categoria</p>
                      <p className="font-bold capitalize">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <p className="font-bold">{product.inStock ? "Em Estoque" : "Fora de Estoque"}</p>
                    </div>
                    {product.specs && (
                      <div>
                        <p className="text-muted-foreground mb-2">Especificações</p>
                        <ul className="space-y-1">
                          {product.specs.map((spec, idx) => (
                            <li key={idx} className="text-xs">
                              <span className="text-muted-foreground">{spec.label}:</span> {spec.value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}

        <div>
          <h2 className="text-2xl font-bold mb-4">Produtos Disponíveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((product) => (
              <Card key={product.id} className="p-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                <h3 className="font-bold mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-lg font-bold text-primary mb-3">${product.price}</p>
                <Button
                  onClick={() => addProduct(product.id)}
                  disabled={selectedProducts.includes(product.id) || selectedProducts.length >= 3}
                  className="w-full"
                  size="sm"
                >
                  {selectedProducts.includes(product.id) ? "Selecionado" : "Adicionar"}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
