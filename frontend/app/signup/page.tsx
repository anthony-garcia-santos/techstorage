"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react"

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório"
    }
    if (!formData.email.includes("@")) {
      newErrors.email = "Email inválido"
    }
    if (formData.password.length < 6) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres"
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Senhas não conferem"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    // Simular cadastro
    setTimeout(() => {
      setIsLoading(false)
      alert("Conta criada com sucesso!")
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Criar Conta</h1>
            <p className="text-muted-foreground">Junte-se à nossa comunidade</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Nome Completo</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="João Silva"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.name ? "border-destructive" : "border-border"
                  }`}
                />
              </div>
              {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email ? "border-destructive" : "border-border"
                  }`}
                />
              </div>
              {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.password ? "border-destructive" : "border-border"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">Confirmar Senha</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 text-muted-foreground" size={20} />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.confirmPassword ? "border-destructive" : "border-border"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-destructive text-sm mt-1">{errors.confirmPassword}</p>}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="mt-1" required />
              <span>
                Concordo com os{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Termos de Serviço
                </Link>
              </span>
            </label>

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Criando conta..." : "Criar Conta"}
            </Button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-muted-foreground mt-6">
            Já tem conta?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Fazer login
            </Link>
          </p>
        </div>
      </Card>
    </div>
  )
}
