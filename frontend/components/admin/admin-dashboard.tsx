"use client"

import { useState, useMemo } from "react"
import { useProducts } from "@/lib/products-context"
import { useOrders } from "@/lib/orders-context"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Trash2, Edit2, Plus, Star, DollarSign, ShoppingCart, TrendingUp, Package } from "lucide-react"
import ProductForm from "./product-form"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Legend } from "recharts"

export default function AdminDashboard() {
  const { products, deleteProduct } = useProducts()
  const { orders } = useOrders()
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const salesMetrics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0)
    const totalOrders = orders.length
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0

    // Orders by status
    const ordersByStatus = orders.reduce(
      (acc, order) => {
        acc[order.status] = (acc[order.status] || 0) + 1
        return acc
      },
      {} as Record<string, number>,
    )

    // Orders by date (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date()
      date.setDate(date.getDate() - (6 - i))
      return date.toISOString().split("T")[0]
    })

    const ordersByDate = last7Days.map((date) => {
      const dayOrders = orders.filter((order) => order.createdAt.split("T")[0] === date)
      const revenue = dayOrders.reduce((sum, order) => sum + order.total, 0)
      return {
        date: new Date(date).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
        orders: dayOrders.length,
        revenue: revenue,
      }
    })

    // Top selling products
    const productSales = orders
      .flatMap((order) => order.items)
      .reduce(
        (acc, item) => {
          if (!acc[item.id]) {
            acc[item.id] = { name: item.name, quantity: 0, revenue: 0 }
          }
          acc[item.id].quantity += item.quantity
          acc[item.id].revenue += item.price * item.quantity
          return acc
        },
        {} as Record<string, { name: string; quantity: number; revenue: number }>,
      )

    const topProducts = Object.values(productSales)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5)

    return {
      totalRevenue,
      totalOrders,
      averageOrderValue,
      ordersByStatus,
      ordersByDate,
      topProducts,
    }
  }, [orders])

  const statusData = [
    { name: "Pendente", value: salesMetrics.ordersByStatus.pending || 0, color: "#94a3b8" },
    { name: "Processando", value: salesMetrics.ordersByStatus.processing || 0, color: "#fbbf24" },
    { name: "Enviado", value: salesMetrics.ordersByStatus.shipped || 0, color: "#60a5fa" },
    { name: "Entregue", value: salesMetrics.ordersByStatus.delivered || 0, color: "#34d399" },
  ].filter((item) => item.value > 0)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">Painel de Administração</h1>
            <p className="text-muted-foreground mt-2">Gerencie seus produtos e acompanhe vendas</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} size="lg">
            <Plus size={20} className="mr-2" />
            Novo Produto
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Receita Total</p>
                <p className="text-3xl font-bold text-primary">${salesMetrics.totalRevenue.toFixed(2)}</p>
              </div>
              <DollarSign className="w-12 h-12 text-primary opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Pedidos</p>
                <p className="text-3xl font-bold">{salesMetrics.totalOrders}</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-primary opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <p className="text-3xl font-bold">${salesMetrics.averageOrderValue.toFixed(2)}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-primary opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Produtos</p>
                <p className="text-3xl font-bold">{products.length}</p>
              </div>
              <Package className="w-12 h-12 text-primary opacity-20" />
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Vendas dos Últimos 7 Dias</h2>
            <ChartContainer
              config={{
                revenue: { label: "Receita", color: "hsl(var(--primary))" },
                orders: { label: "Pedidos", color: "hsl(var(--accent))" },
              }}
              className="h-[300px]"
            >
              <BarChart data={salesMetrics.ordersByDate}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Receita ($)" />
                <Bar dataKey="orders" fill="hsl(var(--accent))" name="Pedidos" />
              </BarChart>
            </ChartContainer>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-bold mb-4">Status dos Pedidos</h2>
            <ChartContainer
              config={{
                pending: { label: "Pendente", color: "#94a3b8" },
                processing: { label: "Processando", color: "#fbbf24" },
                shipped: { label: "Enviado", color: "#60a5fa" },
                delivered: { label: "Entregue", color: "#34d399" },
              }}
              className="h-[300px]"
            >
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </Card>
        </div>

        {salesMetrics.topProducts.length > 0 && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Produtos Mais Vendidos</h2>
            <ChartContainer
              config={{
                revenue: { label: "Receita", color: "hsl(var(--primary))" },
              }}
              className="h-[300px]"
            >
              <BarChart data={salesMetrics.topProducts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={150} />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="revenue" fill="hsl(var(--primary))" name="Receita ($)" />
              </BarChart>
            </ChartContainer>
          </Card>
        )}

        {showForm && (
          <ProductForm
            onClose={() => setShowForm(false)}
            editingId={editingId}
            onEditComplete={() => setEditingId(null)}
          />
        )}

        <div className="mb-4">
          <h2 className="text-2xl font-bold">Gerenciar Produtos</h2>
          <p className="text-muted-foreground">Lista completa de produtos cadastrados</p>
        </div>

        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold">Produto</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Preço</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Categoria</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Estoque</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Destaque</th>
                  <th className="px-6 py-4 text-left text-sm font-bold">Ações</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-border hover:bg-secondary/50 transition">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-10 h-10 rounded object-cover"
                        />
                        <div>
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-muted-foreground">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-bold">${product.price}</td>
                    <td className="px-6 py-4 capitalize">{product.category}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                      >
                        {product.inStock ? "Em Estoque" : "Fora de Estoque"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {product.featured && (
                        <span className="flex items-center gap-1 text-yellow-600">
                          <Star size={16} fill="currentColor" />
                          <span className="text-sm font-medium">Destaque</span>
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setEditingId(product.id)
                            setShowForm(true)
                          }}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => deleteProduct(product.id)}>
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
