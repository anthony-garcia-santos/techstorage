"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, X, Heart, BarChart3 } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useCart } from "@/lib/cart-context"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const { items } = useCart()

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold">T</span>
            </div>
            TechStore
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:opacity-80 transition">
              Home
            </Link>
            <Link href="/products" className="hover:opacity-80 transition">
              Produtos
            </Link>
            <Link href="/compare" className="hover:opacity-80 transition">
              Comparar
            </Link>
            {user?.isAdmin && (
              <Link href="/admin" className="hover:opacity-80 transition font-bold text-accent">
                Admin
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link href="/favorites" className="relative hover:opacity-80 transition" title="Favoritos">
              <Heart size={24} />
            </Link>
            <Link
              href="/compare"
              className="relative hover:opacity-80 transition hidden sm:block"
              title="Comparar"
            >
              <BarChart3 size={24} />
            </Link>
            <Link href="/cart" className="relative hover:opacity-80 transition" title="Carrinho">
              <ShoppingCart size={24} />
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  {items.length}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/orders" className="hidden sm:block">
                  <Button variant="secondary" size="sm" className="text-xs sm:text-sm">
                    <User size={18} className="mr-2" />
                    {user.name}
                  </Button>
                </Link>
                <Button variant="secondary" size="sm" onClick={logout} className="text-xs sm:text-sm">
                  Sair
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button variant="secondary" size="sm">
                  <User size={18} className="mr-2" />
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <Link href="/" className="block py-2 hover:opacity-80">
              Home
            </Link>
            <Link href="/product" className="block py-2 hover:opacity-80">
              Produtos
            </Link>
            <Link href="/compare" className="block py-2 hover:opacity-80">
              Comparar
            </Link>
            <Link href="/favorites" className="block py-2 hover:opacity-80">
              Favoritos
            </Link>
            {user && (
              <Link href="/orders" className="block py-2 hover:opacity-80">
                Dashboard
              </Link>
            )}
            {user?.isAdmin && (
              <Link href="/admin" className="block py-2 hover:opacity-80 font-bold text-accent">
                Admin
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  )
}
