"use client"

import Link from "next/link"
import { ShoppingCart, User, Menu, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

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
            <Link href="/about" className="hover:opacity-80 transition">
              Sobre
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link href="/cart" className="relative hover:opacity-80 transition">
              <ShoppingCart size={24} />
              <span className="absolute -top-2 -right-2 bg-accent text-primary rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                0
              </span>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="sm">
                <User size={18} className="mr-2" />
                Login
              </Button>
            </Link>

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
            <Link href="/products" className="block py-2 hover:opacity-80">
              Produtos
            </Link>
            <Link href="/about" className="block py-2 hover:opacity-80">
              Sobre
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
