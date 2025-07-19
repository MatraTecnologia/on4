"use client"

import Image from "next/image"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, User, Calendar, Tag, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import BlogContent from "./blog-content"
import type { BlogPost } from "@/lib/blog-supabase"

interface BlogPostPreviewProps {
  post: BlogPost
  onClose: () => void
}

export default function BlogPostPreview({ post, onClose }: BlogPostPreviewProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative">
        {post.image && (
          <div className="relative h-64 rounded-lg overflow-hidden mb-4">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        <div className="space-y-4">
          <div className="flex items-center gap-4 flex-wrap">
            <Badge className="bg-[#4ade80] text-white">{post.category}</Badge>
            {post.featured && <Badge className="bg-yellow-500 text-white">Destaque</Badge>}
            <Badge variant={post.published ? "default" : "secondary"}>
              {post.published ? "Publicado" : "Rascunho"}
            </Badge>
          </div>

          <h1 className="text-3xl font-bold text-[#1e3352]">{post.title}</h1>

          <p className="text-lg text-gray-600">{post.excerpt}</p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              {post.author}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {format(new Date(post.created_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              {post.read_time} min de leitura
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">Conteúdo</h2>
        </CardHeader>
        <CardContent>
          <div className="prose prose-sm max-w-none">
            <BlogContent content={post.content} />
          </div>
        </CardContent>
      </Card>

      {/* Tags */}
      {post.tags.length > 0 && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              <h3 className="font-bold">Tags</h3>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center pt-4 border-t">
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>

        {post.published && (
          <Button asChild className="bg-[#4ade80] hover:bg-[#3dc76a]">
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver no Site
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}
