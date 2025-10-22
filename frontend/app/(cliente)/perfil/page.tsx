"use client"

import { useState } from "react"
import { useAuth } from "@/lib/contextos/autenticacao-context"
import { useOrders } from "@/lib/contextos/pedidos-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OrderTracking } from "@/components/order-tracking"
import Link from "next/link"
import { User, Package, Heart, Settings } from "lucide-react"

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { getUserOrders } = useOrders()
  const [activeTab, setActiveTab] = useState("profile")
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
  })

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4">Login Necessário</h2>
          <p className="text-muted-foreground mb-6">Você precisa estar logado para acessar o dashboard</p>
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
        <h1 className="text-4xl font-bold mb-8">Meu Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 text-center">
            <Package size={32} className="mx-auto text-primary mb-2" />
            <p className="text-muted-foreground text-sm">Pedidos</p>
            <p className="text-3xl font-bold">{orders.length}</p>
          </Card>
          <Card className="p-6 text-center">
            <Heart size={32} className="mx-auto text-accent mb-2" />
            <p className="text-muted-foreground text-sm">Favoritos</p>
            <p className="text-3xl font-bold">0</p>
          </Card>
          <Card className="p-6 text-center">
            <User size={32} className="mx-auto text-primary mb-2" />
            <p className="text-muted-foreground text-sm">Membro desde</p>
            <p className="text-sm font-bold">2024</p>
          </Card>
          <Card className="p-6 text-center">
            <Settings size={32} className="mx-auto text-primary mb-2" />
            <p className="text-muted-foreground text-sm">Status</p>
            <p className="text-sm font-bold">Ativo</p>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4">
              <div className="space-y-2">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "profile" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  Perfil
                </button>
                <button
                  onClick={() => setActiveTab("tracking")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "tracking" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  Rastreamento
                </button>
                <button
                  onClick={() => setActiveTab("orders")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "orders" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  Meus Pedidos
                </button>
                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${
                    activeTab === "addresses" ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
                  }`}
                >
                  Endereços
                </button>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 rounded-lg hover:bg-destructive/10 text-destructive transition"
                >
                  Sair
                </button>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div className="lg:col-span-2">
            {activeTab === "profile" && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Meu Perfil</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Nome</label>
                    <Input
                      value={profileData.name}
                      onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <Input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Telefone</label>
                    <Input
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  <Button className="w-full">Salvar Alterações</Button>
                </div>
              </Card>
            )}

            {activeTab === "tracking" && (
              <div>
                <h2 className="text-2xl font-bold mb-6">Rastreamento de Pedidos</h2>
                {orders.length === 0 ? (
                  <Card className="p-12 text-center">
                    <Package size={48} className="mx-auto text-muted-foreground mb-4 opacity-50" />
                    <h3 className="text-xl font-bold mb-2">Nenhum pedido para rastrear</h3>
                    <p className="text-muted-foreground mb-6">Você ainda não fez nenhuma compra</p>
                    <Link href="/products">
                      <Button>Começar a Comprar</Button>
                    </Link>
                  </Card>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <OrderTracking key={order.id} order={order} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "orders" && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Meus Pedidos</h2>
                {orders.length === 0 ? (
                  <p className="text-muted-foreground">Você ainda não fez nenhuma compra</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border border-border rounded-lg p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-bold">Pedido #{order.id}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-primary">${order.total.toFixed(2)}</p>
                            <p className="text-sm capitalize">{order.status}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {activeTab === "addresses" && (
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Meus Endereços</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-muted-foreground">Endereço</label>
                    <Input
                      value={profileData.address}
                      onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                      placeholder="Rua, número, complemento"
                    />
                  </div>
                  <Button className="w-full">Adicionar Endereço</Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
