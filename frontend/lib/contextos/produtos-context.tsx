"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export interface Product {
  id: string
  name: string
  price: number
  description: string
  image: string
  images: string[]
  category: string
  rating: number
  reviews: number
  inStock: boolean
  featured?: boolean
}

interface ProductsContextType {
  products: Product[]
  addProduct: (product: Omit<Product, "id">) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined
  getProductsByCategory: (category: string) => Product[]
  getFeaturedProducts: () => Product[]
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined)

const initialProducts: Product[] = [
  {
    id: "1",
    name: "iPhone 15 Pro",
    price: 999,
    description: `Smartphone premium com chip A17 Pro e câmera de 48MP

Lançamento: 2023
Operadora: Desbloqueado
Rede: GSM / 4G / 5G
NFC: SIM
Memória Interna: 256 GB
Memória RAM: 8 GB`,
    image: "/iphone-15-pro-front-view.jpg",
    images: ["/iphone-15-pro-front-view.jpg", "/iphone-15-pro-back-view.jpg", "/iphone-15-pro-side-view.jpg"],
    category: "Smartphones",
    rating: 4.8,
    reviews: 1234,
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: 'MacBook Pro 16"',
    price: 2499,
    description: `Notebook profissional com chip M3 Pro

Processador: Apple M3 Pro
Memória RAM: 18 GB
Armazenamento: 512 GB SSD
Tela: 16.2" Liquid Retina XDR
Bateria: Até 22 horas`,
    image: "/space-grey-macbook-pro-16.png",
    images: [
      "/space-grey-macbook-pro-16.png",
      "/macbook-pro-keyboard-view.jpg",
      "/macbook-pro-side-profile.jpg",
      "/macbook-pro-ports-view.jpg",
    ],
    category: "Laptops",
    rating: 4.9,
    reviews: 856,
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "AirPods Pro Max",
    price: 549,
    description: `Fones de ouvido premium com cancelamento de ruído

Tipo: Over-ear
Conectividade: Bluetooth 5.0
Cancelamento de Ruído: Ativo
Bateria: Até 20 horas
Chip: Apple H1`,
    image: "/airpods-pro-max.jpg",
    images: [
      "/airpods-pro-max.jpg",
      "/airpods-pro-max-side-view.jpg",
      "/airpods-pro-max-case.jpg",
      "/airpods-pro-max-controls.jpg",
    ],
    category: "Audio",
    rating: 4.7,
    reviews: 432,
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "iPad Air",
    price: 599,
    description: `Tablet versátil com chip M1

Processador: Apple M1
Tela: 10.9" Liquid Retina
Armazenamento: 64 GB
Câmera: 12 MP
Compatível: Apple Pencil (2ª geração)`,
    image: "/ipad-air.png",
    images: [
      "/ipad-air.png",
      "/ipad-air-back-view.jpg",
      "/ipad-air-landscape-mode.jpg",
      "/ipad-air-with-apple-pencil.jpg",
    ],
    category: "Tablets",
    rating: 4.6,
    reviews: 678,
    inStock: true,
    featured: true,
  },
]

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(initialProducts)

  useEffect(() => {
    const savedProducts = localStorage.getItem("products")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products))
  }, [products])

  const addProduct = (product: Omit<Product, "id">) => {
    const newProduct = {
      ...product,
      id: Date.now().toString(),
    }
    setProducts((prev) => [...prev, newProduct])
  }

  const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
    setProducts((prev) => prev.map((product) => (product.id === id ? { ...product, ...updatedProduct } : product)))
  }

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== id))
  }

  const getProductById = (id: string) => {
    return products.find((product) => product.id === id)
  }

  const getProductsByCategory = (category: string) => {
    return products.filter((product) => product.category === category)
  }

  const getFeaturedProducts = () => {
    return products.filter((product) => product.featured)
  }

  return (
    <ProductsContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductsContext)
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductsProvider")
  }
  return context
}
