import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Clock, User, ArrowLeft, Share2, Calendar, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { getBlogPostBySlug, getRelatedBlogPosts } from "@/lib/blog-supabase"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import BlogContent from "@/components/blog-content"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedBlogPosts(params.slug, post.category)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-20">
        {/* Hero Section */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <Image
            src={post.image || "/placeholder.svg?height=500&width=1200"}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-white/80 hover:text-white mb-4 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Blog
              </Link>
              <Badge className="bg-[#4ade80] text-white mb-4">{post.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 max-w-4xl">{post.title}</h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(new Date(post.published_at || post.created_at), "dd 'de' MMMM, yyyy", { locale: ptBR })}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {post.read_time} min de leitura
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <div className="prose prose-lg max-w-none">
                <BlogContent content={post.content} />
              </div>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-700">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="px-3 py-1">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="mt-8 pt-8 border-t">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-700">Compartilhe este artigo:</span>
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Compartilhar
                  </Button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Author Info */}
                <Card>
                  <CardHeader>
                    <h3 className="font-bold text-[#1e3352]">Sobre o Autor</h3>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 bg-[#4ade80] rounded-full flex items-center justify-center text-white font-bold">
                        ON4
                      </div>
                      <div className="ml-3">
                        <p className="font-medium">{post.author}</p>
                        <p className="text-sm text-gray-500">Contabilidade</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Equipe especializada da ON4 Contabilidade, sempre trazendo as melhores dicas e informações sobre
                      contabilidade e tributação.
                    </p>
                  </CardContent>
                </Card>

                {/* CTA */}
                <Card className="bg-[#1e3352] text-white">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold mb-3">Precisa de ajuda?</h3>
                    <p className="text-sm text-gray-300 mb-4">
                      Nossa equipe está pronta para ajudar com suas questões contábeis.
                    </p>
                    <a
                      href="https://wa.me/5543988466580?text=Ol%C3%A1%2C%20estou%20vindo%20do%20blog%0AQuero%20falar%20com%20atendente"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="bg-[#4ade80] hover:bg-[#3dc76a] w-full">Fale Conosco</Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-12 border-t">
              <h2 className="text-3xl font-bold text-[#1e3352] mb-8">Artigos Relacionados</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <Card
                    key={relatedPost.id}
                    className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="relative h-48">
                      <Image
                        src={relatedPost.image || "/placeholder.svg?height=300&width=400"}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    </div>
                    <CardHeader className="pb-3">
                      <Badge className="bg-[#4ade80] text-white text-xs w-fit">{relatedPost.category}</Badge>
                      <h3 className="text-lg font-bold text-[#1e3352] hover:text-[#4ade80] transition-colors line-clamp-2">
                        <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                      </h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{relatedPost.excerpt}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        {relatedPost.read_time} min de leitura
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
