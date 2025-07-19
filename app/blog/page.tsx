import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, User } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPublishedBlogPosts, getFeaturedBlogPost } from "@/lib/blog-supabase"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default async function BlogPage() {
  const [posts, featuredPost] = await Promise.all([getPublishedBlogPosts(), getFeaturedBlogPost()])

  const categories = [...new Set(posts.map((post) => post.category))]

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-[#1e3352] mb-4">Blog ON4 Contabilidade</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Mantenha-se atualizado com dicas e insights sobre contabilidade, gestão financeira e tributação. Acompanhe
              nossas publicações para otimizar sua gestão e tomar decisões mais seguras.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <Badge variant="outline" className="px-4 py-2 text-sm">
              Todos os Posts
            </Badge>
            {categories.map((category) => (
              <Badge key={category} variant="outline" className="px-4 py-2 text-sm">
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-[#1e3352] mb-6">Post em Destaque</h2>
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-64 lg:h-full">
                    <Image
                      src={featuredPost.image || "/placeholder.svg?height=400&width=600"}
                      alt={featuredPost.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <Badge className="bg-[#4ade80] text-white">{featuredPost.category}</Badge>
                      <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {featuredPost.read_time} min de leitura
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-[#1e3352] mb-4 hover:text-[#4ade80] transition-colors">
                      <Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-3">{featuredPost.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <User className="h-4 w-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <span className="text-gray-500 text-sm">
                        {format(new Date(featuredPost.published_at!), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* All Posts Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-[#1e3352] mb-6">Todos os Posts</h2>
            {posts.length === 0 ? (
              <div className="text-center text-gray-500 py-16 text-lg">
                Nenhum post publicado ainda. Volte em breve para novidades!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48">
                      <Image
                        src={post.image || "/placeholder.svg?height=300&width=400"}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-[#4ade80] text-white text-xs">{post.category}</Badge>
                        <div className="flex items-center text-gray-500 text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {post.read_time} min
                        </div>
                      </div>
                      <h3 className="text-lg font-bold text-[#1e3352] hover:text-[#4ade80] transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                      </h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <div className="flex items-center">
                          <User className="h-3 w-3 mr-1" />
                          {post.author}
                        </div>
                        <span>
                          {format(new Date(post.published_at || post.created_at), "dd/MM/yyyy", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-3">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Newsletter Signup */}
          <div className="bg-[#1e3352] rounded-3xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Receba nossas novidades</h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Inscreva-se em nossa newsletter e receba dicas exclusivas sobre contabilidade, tributação e gestão
              financeira diretamente em seu email.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Seu melhor email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
              />
              <button className="bg-[#4ade80] hover:bg-[#3dc76a] text-white px-6 py-3 rounded-lg font-medium transition-colors">
                Inscrever-se
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
