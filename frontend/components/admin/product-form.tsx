"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useProducts } from "@/lib/products-context"
import { Button } from "@/components/ui/button"
import { X, Plus, Trash2 } from "lucide-react"

interface ProductFormProps {
  onClose: () => void
  editingId: string | null
  onEditComplete: () => void
}

export default function ProductForm({ onClose, editingId, onEditComplete }: ProductFormProps) {
  const { products, addProduct, updateProduct } = useProducts()
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    category: "phones",
    image: "",
    images: [] as string[],
    inStock: true,
    featured: false,
  })

  useEffect(() => {
    if (editingId) {
      const product = products.find((p) => p.id === editingId)
      if (product) {
        setFormData({
          name: product.name,
          price: product.price.toString(),
          originalPrice: product.originalPrice?.toString() || "",
          description: product.description,
          category: product.category,
          image: product.image,
          images: product.images || [product.image],
          inStock: product.inStock,
          featured: product.featured || false,
        })
      }
    }
  }, [editingId, products])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          images: [...prev.images, reader.result as string],
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const allImages = formData.image
      ? [formData.image, ...formData.images.filter((img) => img !== formData.image)]
      : formData.images

    const productData = {
      name: formData.name,
      price: Number.parseFloat(formData.price),
      originalPrice: formData.originalPrice ? Number.parseFloat(formData.originalPrice) : undefined,
      description: formData.description,
      category: formData.category,
      image: formData.image,
      images: allImages,
      inStock: formData.inStock,
      featured: formData.featured,
      rating: 4.5,
      reviews: 0,
      specs: [{ label: "Descrição", value: formData.description }],
    }

    if (editingId) {
      updateProduct(editingId, productData)
      onEditComplete()
    } else {
      addProduct(productData)
    }

    setFormData({
      name: "",
      price: "",
      originalPrice: "",
      description: "",
      category: "phones",
      image: "",
      images: [],
      inStock: true,
      featured: false,
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg border border-border max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-card border-b border-border flex justify-between items-center p-6">
          <h2 className="text-2xl font-bold">{editingId ? "Editar Produto" : "Novo Produto"}</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Nome do Produto</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ex: iPhone 15 Pro"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Preço</label>
              <input
                type="number"
                required
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData((prev) => ({ ...prev, price: e.target.value }))}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="1299.99"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preço Original (opcional)</label>
              <input
                type="number"
                step="0.01"
                value={formData.originalPrice}
                onChange={(e) => setFormData((prev) => ({ ...prev, originalPrice: e.target.value }))}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="1599.99"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Descrição</label>
            <p className="text-xs text-muted-foreground mb-2">Use Enter para adicionar quebras de linha na descrição</p>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              rows={6}
              placeholder="Descreva o produto...&#10;&#10;Exemplo:&#10;Lançamento: 2023&#10;Operadora: Desbloqueado&#10;Rede: GSM / 4G / 5G"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Categoria</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="phones">Telefones</option>
                <option value="laptops">Laptops</option>
                <option value="tablets">Tablets</option>
                <option value="accessories">Acessórios</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={formData.inStock ? "true" : "false"}
                onChange={(e) => setFormData((prev) => ({ ...prev, inStock: e.target.value === "true" }))}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="true">Em Estoque</option>
                <option value="false">Fora de Estoque</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-secondary/30 rounded-lg">
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
              className="w-5 h-5 rounded border-border text-primary focus:ring-2 focus:ring-primary cursor-pointer"
            />
            <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
              Marcar como produto em destaque (aparecerá na página inicial)
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Foto Principal do Produto</label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary transition">
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="image-upload" />
              <label htmlFor="image-upload" className="cursor-pointer block">
                {formData.image ? (
                  <div className="space-y-2">
                    <img
                      src={formData.image || "/placeholder.svg"}
                      alt="Preview"
                      className="w-32 h-32 object-cover mx-auto rounded"
                    />
                    <p className="text-sm text-muted-foreground">Clique para alterar</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Clique para fazer upload</p>
                    <p className="text-xs text-muted-foreground">PNG, JPG até 5MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Galeria de Fotos Adicionais</label>
            <p className="text-xs text-muted-foreground mb-3">
              Adicione mais fotos do produto para aparecerem na galeria
            </p>

            <div className="grid grid-cols-4 gap-3 mb-3">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={img || "/placeholder.svg"}
                    alt={`Imagem ${index + 1}`}
                    className="w-full h-24 object-cover rounded border border-border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground p-1 rounded opacity-0 group-hover:opacity-100 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-2 border-dashed border-border rounded-lg p-4 text-center cursor-pointer hover:border-primary transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleAdditionalImageUpload}
                className="hidden"
                id="additional-image-upload"
              />
              <label htmlFor="additional-image-upload" className="cursor-pointer block">
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Plus size={18} />
                  <span>Adicionar mais fotos</span>
                </div>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1" size="lg">
              {editingId ? "Atualizar Produto" : "Adicionar Produto"}
            </Button>
            <Button type="button" variant="outline" onClick={onClose} className="flex-1 bg-transparent" size="lg">
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
