"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Order } from "@/lib/orders-context"
import { Package, Truck, CheckCircle, Clock, MapPin } from "lucide-react"

interface OrderTrackingProps {
  order: Order
}

export function OrderTracking({ order }: OrderTrackingProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5" />
      case "processing":
        return <Package className="w-5 h-5" />
      case "shipped":
        return <Truck className="w-5 h-5" />
      case "delivered":
        return <CheckCircle className="w-5 h-5" />
      default:
        return <Clock className="w-5 h-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800"
      case "processing":
        return "bg-yellow-100 text-yellow-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendente"
      case "processing":
        return "Processando"
      case "shipped":
        return "Enviado"
      case "delivered":
        return "Entregue"
      default:
        return status
    }
  }

  const statusSteps = [
    { key: "pending", label: "Pedido Recebido", icon: Clock },
    { key: "processing", label: "Em Processamento", icon: Package },
    { key: "shipped", label: "Enviado", icon: Truck },
    { key: "delivered", label: "Entregue", icon: CheckCircle },
  ]

  const currentStepIndex = statusSteps.findIndex((step) => step.key === order.status)

  return (
    <Card className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">Pedido #{order.id}</h3>
            <p className="text-sm text-muted-foreground">
              Código de Rastreamento: <span className="font-mono font-semibold">{order.trackingNumber}</span>
            </p>
          </div>
          <Badge className={getStatusColor(order.status)}>{getStatusLabel(order.status)}</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Data do Pedido</p>
            <p className="font-semibold">{new Date(order.createdAt).toLocaleDateString("pt-BR")}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Previsão de Entrega</p>
            <p className="font-semibold">{new Date(order.estimatedDelivery).toLocaleDateString("pt-BR")}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-1 flex items-center gap-2">
            <MapPin size={16} /> Endereço de Entrega
          </p>
          <p className="text-sm">{order.shippingAddress}</p>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="mb-8">
        <h4 className="font-semibold mb-4">Status do Pedido</h4>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-border" />
          <div
            className="absolute left-6 top-6 w-0.5 bg-primary transition-all duration-500"
            style={{ height: `${(currentStepIndex / (statusSteps.length - 1)) * 100}%` }}
          />

          {/* Steps */}
          <div className="space-y-6">
            {statusSteps.map((step, index) => {
              const isCompleted = index <= currentStepIndex
              const isCurrent = index === currentStepIndex
              const StepIcon = step.icon

              return (
                <div key={step.key} className="flex items-start gap-4 relative">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center z-10 transition-colors ${
                      isCompleted ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 pt-2">
                    <p className={`font-semibold ${isCurrent ? "text-primary" : ""}`}>{step.label}</p>
                    {isCompleted && (
                      <p className="text-sm text-muted-foreground">
                        {index === currentStepIndex ? "Status atual" : "Concluído"}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Tracking Events */}
      {order.trackingEvents && order.trackingEvents.length > 0 && (
        <div>
          <h4 className="font-semibold mb-4">Histórico de Rastreamento</h4>
          <div className="space-y-3">
            {[...order.trackingEvents].reverse().map((event, index) => (
              <div key={index} className="flex gap-3 pb-3 border-b border-border last:border-0">
                <div className="flex-shrink-0 mt-1">{getStatusIcon(event.status)}</div>
                <div className="flex-1">
                  <p className="font-semibold text-sm">{event.description}</p>
                  <p className="text-xs text-muted-foreground">{event.location}</p>
                  <p className="text-xs text-muted-foreground">{new Date(event.date).toLocaleString("pt-BR")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Products */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="font-semibold mb-4">Produtos</h4>
        <div className="space-y-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                {item.image && (
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                )}
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground">Quantidade: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold">${item.price.toFixed(2)}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
          <p className="font-bold">Total</p>
          <p className="font-bold text-lg text-primary">${order.total.toFixed(2)}</p>
        </div>
      </div>
    </Card>
  )
}
