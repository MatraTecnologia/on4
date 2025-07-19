"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import AnimatedElement from "./animated-element"
import { getPublishedBlogPosts } from "@/lib/blog-supabase"
import type { BlogPost } from "@/lib/blog-supabase"

export default function NewBlogSection() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPublishedBlogPosts()
        setPosts(data.slice(0, 2)) // Pegar apenas os 2 primeiros posts
      } catch (error) {
        console.error("Erro ao carregar posts:", error)
      }
    }

    loadPosts()
  }, [])

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="slide-up" duration={0.8} threshold={0.3}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e3352] mb-4">Confira nosso blog</h2>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.1} duration={0.8} threshold={0.3}>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Mantenha-se atualizado com dicas e insights sobre contabilidade, gestão financeira e tributação. Acompanhe
            nossas publicações para otimizar sua gestão e tomar decisões mais seguras
          </p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          {posts.map((post, index) => (
            <AnimatedElement
              key={post.id}
              animation="slide-up"
              delay={0.2 + index * 0.1}
              duration={0.8}
              threshold={0.3}
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="flex flex-col h-full transform transition-all duration-500 hover:translate-y-[-8px] hover:shadow-xl">
                  <div className="rounded-2xl overflow-hidden mb-4 h-48 md:h-64 shadow-md transition-all duration-500 hover:shadow-xl">
                    <Image
                      src={post.image || "/placeholder.svg?height=300&width=400"}
                      alt={post.title}
                      width={400}
                      height={300}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#1e3352] mb-2 transition-colors duration-300 hover:text-[#4ade80]">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 flex-grow">{post.excerpt}</p>
                </div>
              </Link>
            </AnimatedElement>
          ))}
        </div>

        <AnimatedElement animation="zoom-in" delay={0.4} threshold={0.4}>
          <div className="flex justify-center">
            <Link href="/blog">
              <Button className="bg-[#4ade80] hover:bg-[#3dc76a] text-white font-medium px-12 py-3 h-auto rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
                Acessar o Blog
              </Button>
            </Link>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
