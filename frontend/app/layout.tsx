import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { AuthProvider } from "@/lib/auth-context"
import { ProductsProvider } from "@/lib/products-context"
import { CartProvider } from "@/lib/cart-context"
import { OrdersProvider } from "@/lib/orders-context"
import { FavoritesProvider } from "@/lib/favorites-context"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "TechStore - E-commerce",
  description: "Your premium tech store",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased flex flex-col min-h-screen`}>
        <AuthProvider>
          <ProductsProvider>
            <CartProvider>
              <OrdersProvider>
                <FavoritesProvider>
                  <Header />
                  <main className="flex-1">{children}</main>
                  <Footer />
                  <Analytics />
                </FavoritesProvider>
              </OrdersProvider>
            </CartProvider>
          </ProductsProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
