"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"

interface Review {
  id: string
  author: string
  rating: number
  title: string
  comment: string
  date: string
}

interface ReviewSectionProps {
  productId: string
}

export default function ReviewSection({ productId }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    author: "",
    rating: 5,
    title: "",
    comment: "",
  })

  useEffect(() => {
    const storedReviews = localStorage.getItem(`reviews-${productId}`)
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews))
    }
  }, [productId])

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault()

    const newReview: Review = {
      id: Date.now().toString(),
      author: formData.author,
      rating: formData.rating,
      title: formData.title,
      comment: formData.comment,
      date: new Date().toLocaleDateString("pt-BR"),
    }

    const updated = [newReview, ...reviews]
    setReviews(updated)
    localStorage.setItem(`reviews-${productId}`, JSON.stringify(updated))

    setFormData({
      author: "",
      rating: 5,
      title: "",
      comment: "",
    })
    setShowForm(false)
  }

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0

  return (
    <div className="mt-16 pt-12 border-t border-border">
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-4">Avaliações e Comentários</h2>

        {/* Rating Summary */}
        <div className="bg-secondary/50 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-6">
            <div>
              <div className="text-5xl font-bold">{averageRating}</div>
              <div className="flex items-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.round(Number(averageRating)) ? "fill-accent text-accent" : "text-muted"}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">{reviews.length} avaliações</p>
            </div>

            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter((r) => r.rating === rating).length
                const percentage = reviews.length > 0 ? (count / reviews.length) * 100 : 0
                return (
                  <div key={rating} className="flex items-center gap-2 mb-2">
                    <span className="text-sm w-8">{rating}★</span>
                    <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
                      <div className="bg-accent h-full" style={{ width: `${percentage}%` }}></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8 text-right">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {!showForm && (
          <Button onClick={() => setShowForm(true)} size="lg" className="mb-8">
            Deixar uma Avaliação
          </Button>
        )}

        {/* Review Form */}
        {showForm && (
          <form onSubmit={handleSubmitReview} className="bg-secondary/30 rounded-lg p-6 mb-8 space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Seu Nome</label>
              <input
                type="text"
                required
                value={formData.author}
                onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Classificação</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, rating }))}
                    className="focus:outline-none transition"
                  >
                    <Star
                      size={32}
                      className={
                        rating <= formData.rating
                          ? "fill-accent text-accent cursor-pointer"
                          : "text-muted cursor-pointer hover:text-accent"
                      }
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Título</label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Resumo da sua avaliação"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Comentário</label>
              <textarea
                required
                value={formData.comment}
                onChange={(e) => setFormData((prev) => ({ ...prev, comment: e.target.value }))}
                className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                rows={4}
                placeholder="Compartilhe sua experiência com este produto..."
              />
            </div>

            <div className="flex gap-3">
              <Button type="submit" className="flex-1">
                Enviar Avaliação
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-transparent"
              >
                Cancelar
              </Button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="border border-border rounded-lg p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-bold">{review.author}</p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} className={i < review.rating ? "fill-accent text-accent" : "text-muted"} />
                  ))}
                </div>
              </div>
              <h4 className="font-bold mb-2">{review.title}</h4>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>

        {reviews.length === 0 && !showForm && (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Nenhuma avaliação ainda</p>
            <Button onClick={() => setShowForm(true)}>Seja o primeiro a avaliar</Button>
          </div>
        )}
      </div>
    </div>
  )
}
