"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  images?: string[]
  description: string
  category: string
  rating: number
  reviews: number
  specs: Array<{ label: string; value: string }>
  inStock: boolean
  featured?: boolean
}

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

const initialProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 1299,
    originalPrice: 1599,
    image: "/iphone-15-pro-smartphone.jpg",
    images: [
      "/iphone-15-pro-smartphone.jpg",
      "/iphone-15-pro-front-view.jpg",
      "/iphone-15-pro-back-view.jpg",
      "/iphone-15-pro-side-view.jpg",
    ],
    rating: 4.8,
    reviews: 324,
    category: "phones",
    description:
      "O iPhone 15 Pro oferece o melhor em tecnologia Apple com câmera avançada, processador A17 Pro e design premium.",
    specs: [
      { label: "Tela", value: '6.1" Super Retina XDR' },
      { label: "Processador", value: "A17 Pro" },
      { label: "Câmera", value: "48MP Principal" },
      { label: "Bateria", value: "Até 29 horas" },
      { label: "Armazenamento", value: "256GB" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: 'MacBook Pro 16"',
    price: 2499,
    originalPrice: 2999,
    image: "/macbook-pro-laptop.jpg",
    images: [
      "/macbook-pro-laptop.jpg",
      "/macbook-pro-keyboard-view.jpg",
      "/macbook-pro-side-profile.jpg",
      "/macbook-pro-ports-view.jpg",
    ],
    rating: 4.9,
    reviews: 512,
    category: "laptops",
    description:
      'MacBook Pro 16" com chip M3 Max, perfeito para profissionais que precisam de poder de processamento máximo.',
    specs: [
      { label: "Tela", value: '16" Liquid Retina XDR' },
      { label: "Processador", value: "M3 Max" },
      { label: "RAM", value: "36GB" },
      { label: "Armazenamento", value: "1TB SSD" },
      { label: "Bateria", value: "Até 22 horas" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "AirPods Pro Max",
    price: 549,
    image: "/airpods-pro-max-headphones.jpg",
    images: [
      "/airpods-pro-max-headphones.jpg",
      "/airpods-pro-max-side-view.jpg",
      "/airpods-pro-max-case.jpg",
      "/airpods-pro-max-controls.jpg",
    ],
    rating: 4.7,
    reviews: 289,
    category: "accessories",
    description:
      "AirPods Pro Max oferece áudio de alta fidelidade com cancelamento de ruído ativo e design premium em alumínio.",
    specs: [
      { label: "Driver", value: "40mm dinâmico" },
      { label: "Cancelamento", value: "Ativo adaptativo" },
      { label: "Bateria", value: "Até 20 horas" },
      { label: "Conectividade", value: "Bluetooth 5.0" },
      { label: "Peso", value: "384g" },
    ],
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "iPad Air",
    price: 799,
    image: "/ipad-air-tablet.jpg",
    images: [
      "/ipad-air-tablet.jpg",
      "/ipad-air-with-apple-pencil.jpg",
      "/ipad-air-landscape-mode.jpg",
      "/ipad-air-back-view.jpg",
    ],
    rating: 4.6,
    reviews: 198,
    category: "tablets",
    description:
      "iPad Air com chip M1 oferece desempenho excepcional para trabalho e entretenimento em um design fino e leve.",
    specs: [
      { label: "Tela", value: '10.9" Liquid Retina' },
      { label: "Processador", value: "Apple M1" },
      { label: "Armazenamento", value: "256GB" },
      { label: "Câmera", value: "12MP traseira" },
      { label: "Bateria", value: "Até 10 horas" },
    ],
    inStock: true,
    featured: true,
  },
]

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  useEffect(() => {
    const storedProducts = localStorage.getItem("products")
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts))
    }
  }, [])

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
    }
    const updated = [...products, newProduct]
    setProducts(updated)
    localStorage.setItem("products", JSON.stringify(updated))
  }

  const updateProduct = (id: string, updates: Partial<Product>) => {
    const updated = products.map((p) => (p.id === id ? { ...p, ...updates } : p))
    setProducts(updated)
    localStorage.setItem("products", JSON.stringify(updated))
  }

  const deleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id)
    setProducts(updated)
    localStorage.setItem("products", JSON.stringify(updated))
  }

  return (
    <ProductsContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts deve ser usado dentro de ProductsProvider")
  }
  return context
}
