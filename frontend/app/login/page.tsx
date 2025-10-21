"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simular login
    setTimeout(() => {
      setIsLoading(false)
      alert("Login realizado com sucesso!")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Bem-vindo</h1>
            <p className="text-muted-foreground">Faça login na sua conta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Lembrar-me</span>
              </label>
              <Link href="/forgot-password" className="text-primary hover:underline">
                Esqueceu a senha?
              </Link>
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Ou</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="space-y-2">
            <Button variant="outline" className="w-full bg-transparent">
              Entrar com Google
            </Button>
            <Button variant="outline" className="w-full bg-transparent">
              Entrar com Apple
            </Button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Não tem conta?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Criar conta
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
