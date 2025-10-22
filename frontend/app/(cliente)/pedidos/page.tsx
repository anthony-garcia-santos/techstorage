"use client"

import { useAuth } from "@/lib/contextos/autenticacao-context"
import { useOrders } from "@/lib/contextos/pedidos-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package, Calendar, MapPin, DollarSign } from "lucide-react"

export default function OrdersPage() {
  const { user } = useAuth()
  const { getUserOrders } = useOrders()

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Login Necessário</h2>
          <p className="text-muted-foreground mb-6">Você precisa estar logado para ver seus pedidos</p>
          <Link href="/login">
            <Button className="w-full">Ir para Login</Button>
          </Link>
        </Card>
      </div>
    )
  }

  const orders = getUserOrders(user.id)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-2">Meus Pedidos</h1>
        <p className="text-muted-foreground mb-8">Acompanhe seus pedidos e histórico de compras</p>

        {orders.length === 0 ? (
          <Card className="p-12 text-center">
            <Package size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-2xl font-bold mb-2">Nenhum pedido ainda</h2>
            <p className="text-muted-foreground mb-6">Você ainda não fez nenhuma compra</p>
            <Link href="/products">
              <Button>Começar a Comprar</Button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Pedido ID</p>
                    <p className="font-bold">{order.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Calendar size={16} /> Data
                    </p>
                    <p className="font-bold">{new Date(order.createdAt).toLocaleDateString("pt-BR")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <DollarSign size={16} /> Total
                    </p>
                    <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p
                      className={`font-bold capitalize px-3 py-1 rounded-full text-sm w-fit ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "shipped"
                            ? "bg-blue-100 text-blue-800"
                            : order.status === "processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status === "pending" && "Pendente"}
                      {order.status === "processing" && "Processando"}
                      {order.status === "shipped" && "Enviado"}
                      {order.status === "delivered" && "Entregue"}
                    </p>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground flex items-center gap-2 mb-2">
                    <MapPin size={16} /> Endereço de Entrega
                  </p>
                  <p className="text-sm">{order.shippingAddress}</p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
