"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export interface TrackingEvent {
  status: string
  description: string
  date: Date
  location?: string
}

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  createdAt: Date
  trackingNumber?: string
  estimatedDelivery?: Date
  trackingEvents?: TrackingEvent[]
  shippingAddress?: {
    street: string
    city: string
    state: string
    zipCode: string
  }
}

interface OrdersContextType {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "createdAt" | "trackingNumber" | "trackingEvents">) => void
  updateOrderStatus: (id: string, status: Order["status"]) => void
  getOrderById: (id: string) => Order | undefined
}

const OrdersContext = createContext<OrdersContextType | undefined>(undefined)

const generateTrackingNumber = () => {
  return "BR" + Math.random().toString(36).substring(2, 15).toUpperCase()
}

const generateTrackingEvents = (status: Order["status"], createdAt: Date): TrackingEvent[] => {
  const events: TrackingEvent[] = [
    {
      status: "pending",
      description: "Pedido recebido",
      date: createdAt,
      location: "São Paulo, SP",
    },
  ]

  if (status === "processing" || status === "shipped" || status === "delivered") {
    events.push({
      status: "processing",
      description: "Pedido em preparação",
      date: new Date(createdAt.getTime() + 24 * 60 * 60 * 1000),
      location: "Centro de Distribuição - São Paulo, SP",
    })
  }

  if (status === "shipped" || status === "delivered") {
    events.push({
      status: "shipped",
      description: "Pedido enviado",
      date: new Date(createdAt.getTime() + 48 * 60 * 60 * 1000),
      location: "Em trânsito",
    })
  }

  if (status === "delivered") {
    events.push({
      status: "delivered",
      description: "Pedido entregue",
      date: new Date(createdAt.getTime() + 120 * 60 * 60 * 1000),
      location: "Endereço de entrega",
    })
  }

  return events
}

const initialOrders: Order[] = [
  {
    id: "1",
    items: [
      {
        id: "1",
        name: "iPhone 15 Pro",
        price: 999,
        quantity: 1,
        image: "/iphone-15-pro-front-view.jpg",
      },
    ],
    total: 999,
    status: "delivered",
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    trackingNumber: generateTrackingNumber(),
    estimatedDelivery: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    trackingEvents: generateTrackingEvents("delivered", new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)),
    shippingAddress: {
      street: "Rua Exemplo, 123",
      city: "São Paulo",
      state: "SP",
      zipCode: "01234-567",
    },
  },
  {
    id: "2",
    items: [
      {
        id: "2",
        name: 'MacBook Pro 16"',
        price: 2499,
        quantity: 1,
        image: "/space-grey-macbook-pro-16.png",
      },
    ],
    total: 2499,
    status: "shipped",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    trackingNumber: generateTrackingNumber(),
    estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    trackingEvents: generateTrackingEvents("shipped", new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)),
    shippingAddress: {
      street: "Av. Paulista, 1000",
      city: "São Paulo",
      state: "SP",
      zipCode: "01310-100",
    },
  },
]

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders)

  useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      const parsedOrders = JSON.parse(savedOrders)
      setOrders(
        parsedOrders.map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
          trackingEvents: order.trackingEvents?.map((event: any) => ({
            ...event,
            date: new Date(event.date),
          })),
        })),
      )
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders))
  }, [orders])

  const addOrder = (order: Omit<Order, "id" | "createdAt" | "trackingNumber" | "trackingEvents">) => {
    const createdAt = new Date()
    const trackingNumber = generateTrackingNumber()
    const estimatedDelivery = new Date(createdAt.getTime() + 5 * 24 * 60 * 60 * 1000)
    const trackingEvents = generateTrackingEvents(order.status, createdAt)

    const newOrder: Order = {
      ...order,
      id: Date.now().toString(),
      createdAt,
      trackingNumber,
      estimatedDelivery,
      trackingEvents,
    }
    setOrders((prev) => [newOrder, ...prev])
  }

  const updateOrderStatus = (id: string, status: Order["status"]) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === id) {
          const trackingEvents = generateTrackingEvents(status, order.createdAt)
          return { ...order, status, trackingEvents }
        }
        return order
      }),
    )
  }

  const getOrderById = (id: string) => {
    return orders.find((order) => order.id === id)
  }

  return (
    <OrdersContext.Provider value={{ orders, addOrder, updateOrderStatus, getOrderById }}>
      {children}
    </OrdersContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrdersContext)
  if (context === undefined) {
    throw new Error("useOrders must be used within an OrdersProvider")
  }
  return context
}
