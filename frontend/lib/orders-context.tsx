"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Order {
  id: string
  userId: string
  items: Array<{ id: string; name: string; price: number; quantity: number; image?: string }>
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  shippingAddress: string
  createdAt: string
  estimatedDelivery: string
  trackingNumber?: string
  trackingEvents?: Array<{
    status: string
    location: string
    date: string
    description: string
  }>
}

interface OrdersContextType {
  orders: Order[]
  createOrder: (order: Omit<Order, "id" | "createdAt">) => void
  updateOrderStatus: (id: string, status: Order["status"]) => void
  getUserOrders: (userId: string) => Order[]
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

export function OrdersProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("orders")
    if (stored) setOrders(JSON.parse(stored))
  }, [])

  const createOrder = (order: Omit<Order, "id" | "createdAt">) => {
    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      trackingNumber: `BR${Date.now().toString().slice(-10)}`,
      trackingEvents: [
        {
          status: "pending",
          location: "Centro de Distribuição - São Paulo, SP",
          date: new Date().toISOString(),
          description: "Pedido recebido e aguardando processamento",
        },
      ],
    }
    const updated = [...orders, newOrder]
    setOrders(updated)
    localStorage.setItem("orders", JSON.stringify(updated))
  }

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    const updated = orders.map((o) => {
      if (o.id === id) {
        const newEvent = {
          status,
          location: "Centro de Distribuição - São Paulo, SP",
          date: new Date().toISOString(),
          description:
            status === "processing"
              ? "Pedido em processamento"
              : status === "shipped"
                ? "Pedido enviado para transporte"
                : status === "delivered"
                  ? "Pedido entregue ao destinatário"
                  : "Aguardando processamento",
        }
        return {
          ...o,
          status,
          trackingEvents: [...(o.trackingEvents || []), newEvent],
        }
      }
      return o
    })
    setOrders(updated)
    localStorage.setItem("orders", JSON.stringify(updated))
  }

  const getUserOrders = (userId: string) => {
    return orders.filter((o) => o.userId === userId)
  }

  return (
    <OrdersContext.Provider value={{ orders, createOrder, updateOrderStatus, getUserOrders }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (!context) throw new Error("useOrders deve ser usado dentro de OrdersProvider")
  return context
}
