"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react"

interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: 1299,
      quantity: 1,
      image: "/placeholder.svg?key=1r4xb",
    },
    {
      id: 2,
      name: 'MacBook Pro 16"',
      price: 2499,
      quantity: 1,
      image: "/placeholder.svg?key=zts9p",
    },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 50 : 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-8">Carrinho de Compras</h1>

        {cartItems.length === 0 ? (
          <Card className="p-12 text-center">
            <ShoppingCart size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Carrinho vazio</h2>
            <p className="text-muted-foreground mb-6">Adicione produtos para começar a comprar</p>
            <Link href="/products">
              <Button>Continuar Comprando</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <Card>
                <div className="divide-y">
                  {cartItems.map((item) => (
                    <div key={item.id} className="p-6 flex gap-6">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg bg-muted"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                        <p className="text-primary font-bold text-lg mb-4">${item.price}</p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-2 hover:bg-secondary"
                            >
                              <Minus size={18} />
                            </button>
                            <span className="px-4 py-2 font-bold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-2 hover:bg-secondary"
                            >
                              <Plus size={18} />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:bg-destructive/10 p-2 rounded-lg transition"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="p-6 sticky top-20">
                <h2 className="font-bold text-xl mb-6">Resumo do Pedido</h2>
                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Envio</span>
                    <span className="font-bold">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impostos</span>
                    <span className="font-bold">${tax.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between mb-6">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-2xl text-primary">${total.toFixed(2)}</span>
                </div>
                <Button className="w-full mb-3">Ir para Checkout</Button>
                <Link href="/products">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continuar Comprando
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
