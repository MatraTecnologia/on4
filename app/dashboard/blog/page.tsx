"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Eye,
  Edit,
  Trash2,
  Search,
  Plus,
  FileText,
  Calendar,
  Users,
  RefreshCw,
  ExternalLink,
  Star,
  StarOff,
} from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"
import Link from "next/link"
import {
  getAllBlogPosts,
  searchBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getBlogStats,
  type BlogPost,
} from "@/lib/blog-supabase"
import BlogPostForm from "@/components/blog-post-form"
import BlogPostPreview from "@/components/blog-post-preview"

export default function BlogDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
  })

  // Carregar dados iniciais
  useEffect(() => {
    loadPosts()
    loadStats()
  }, [])

  // Filtrar posts quando o termo de busca muda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts)
    } else {
      handleSearch()
    }
  }, [searchTerm, posts])

  const loadPosts = async () => {
    try {
      setLoading(true)
      const data = await getAllBlogPosts()
      setPosts(data)
      setFilteredPosts(data)
    } catch (error) {
      toast.error("Erro ao carregar posts")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await getBlogStats()
      setStats(data)
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error)
    }
  }

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts)
      return
    }

    try {
      const data = await searchBlogPosts(searchTerm)
      setFilteredPosts(data)
    } catch (error) {
      toast.error("Erro ao buscar posts")
      console.error(error)
    }
  }

  const handleAddPost = async (postData: Omit<BlogPost, "id" | "created_at" | "updated_at">) => {
    try {
      const newPost = await createBlogPost(postData)
      setPosts((prev) => [newPost, ...prev])
      setIsAddOpen(false)
      toast.success("Post criado com sucesso!")
      loadStats()
    } catch (error) {
      toast.error("Erro ao criar post")
      console.error(error)
    }
  }

  const handleEditPost = async (postData: Partial<BlogPost>) => {
    if (!selectedPost) return

    try {
      const updatedPost = await updateBlogPost(selectedPost.id, postData)
      setPosts((prev) => prev.map((post) => (post.id === selectedPost.id ? updatedPost : post)))
      setIsEditOpen(false)
      setSelectedPost(null)
      toast.success("Post atualizado com sucesso!")
      loadStats()
    } catch (error) {
      toast.error("Erro ao atualizar post")
      console.error(error)
    }
  }

  const handleDeletePost = async (id: string) => {
    try {
      await deleteBlogPost(id)
      setPosts((prev) => prev.filter((post) => post.id !== id))
      toast.success("Post excluído com sucesso!")
      loadStats()
    } catch (error) {
      toast.error("Erro ao excluir post")
      console.error(error)
    }
  }

  const handleTogglePublished = async (post: BlogPost) => {
    try {
      const updatedPost = await updateBlogPost(post.id, { published: !post.published })
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)))
      toast.success(`Post ${updatedPost.published ? "publicado" : "despublicado"} com sucesso!`)
      loadStats()
    } catch (error) {
      toast.error("Erro ao alterar status do post")
      console.error(error)
    }
  }

  const handleToggleFeatured = async (post: BlogPost) => {
    try {
      const updatedPost = await updateBlogPost(post.id, { featured: !post.featured })
      setPosts((prev) => prev.map((p) => (p.id === post.id ? updatedPost : p)))
      toast.success(`Post ${updatedPost.featured ? "marcado" : "desmarcado"} como destaque!`)
    } catch (error) {
      toast.error("Erro ao alterar destaque do post")
      console.error(error)
    }
  }

  const getStatusColor = (published: boolean) => {
    return published ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Carregando...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publicados</CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rascunhos</CardTitle>
            <Users className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.drafts}</div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Buscar por título, categoria ou conteúdo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2">
          <Link href="/blog" target="_blank">
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              Ver Blog
            </Button>
          </Link>

          <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
              <Button className="bg-[#4ade80] hover:bg-[#3dc76a]">
                <Plus className="h-4 w-4 mr-2" />
                Novo Post
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Criar Novo Post</DialogTitle>
                <DialogDescription>Preencha os dados do novo post do blog</DialogDescription>
              </DialogHeader>
              <BlogPostForm onSubmit={handleAddPost} onCancel={() => setIsAddOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Posts</CardTitle>
          <CardDescription>{filteredPosts.length} post(s) encontrado(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Título</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Destaque</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{post.title}</div>
                      <div className="text-sm text-gray-500 truncate">{post.excerpt}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(post.published)}>
                        {post.published ? "Publicado" : "Rascunho"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" onClick={() => handleToggleFeatured(post)} className="p-1">
                        {post.featured ? (
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        ) : (
                          <StarOff className="h-4 w-4 text-gray-400" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell>{format(new Date(post.created_at), "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedPost(post)
                            setIsPreviewOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedPost(post)
                            setIsEditOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleTogglePublished(post)}
                          className={post.published ? "text-yellow-600" : "text-green-600"}
                        >
                          {post.published ? "Despublicar" : "Publicar"}
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir o post "{post.title}"? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDeletePost(post.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Preview do Post</DialogTitle>
          </DialogHeader>
          {selectedPost && <BlogPostPreview post={selectedPost} onClose={() => setIsPreviewOpen(false)} />}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Post</DialogTitle>
            <DialogDescription>Atualize as informações do post</DialogDescription>
          </DialogHeader>
          {selectedPost && (
            <BlogPostForm post={selectedPost} onSubmit={handleEditPost} onCancel={() => setIsEditOpen(false)} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
