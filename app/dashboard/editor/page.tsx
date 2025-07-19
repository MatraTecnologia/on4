"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  LinkIcon,
  ImageIcon,
  Quote,
  Code,
  Type,
  Palette,
  Save,
  Eye,
} from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

interface GalleryImage {
  id: string
  name: string
  url: string
  size: number
  type: string
  created_at: string
}

export default function EditorPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [tags, setTags] = useState("")
  const [isPublished, setIsPublished] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([])
  const [showGallery, setShowGallery] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadGalleryImages()
  }, [])

  const loadGalleryImages = async () => {
    try {
      const { data, error } = await supabase.storage.from("galeria").list("", {
        limit: 100,
        offset: 0,
      })

      if (error) throw error

      const images = await Promise.all(
        data.map(async (file) => {
          const {
            data: { publicUrl },
          } = supabase.storage.from("galeria").getPublicUrl(file.name)

          return {
            id: file.id || file.name,
            name: file.name,
            url: publicUrl,
            size: file.metadata?.size || 0,
            type: file.metadata?.mimetype || "image/jpeg",
            created_at: file.created_at || new Date().toISOString(),
          }
        }),
      )

      setGalleryImages(images.filter((img) => img.name.match(/\.(jpg|jpeg|png|gif|webp)$/i)))
    } catch (error) {
      console.error("Erro ao carregar galeria:", error)
    }
  }

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const insertImage = (imageUrl: string) => {
    const img = `<img src="${imageUrl}" alt="Imagem" style="max-width: 100%; height: auto; margin: 10px 0;" />`
    document.execCommand("insertHTML", false, img)
    setShowGallery(false)
    editorRef.current?.focus()
  }

  const insertLink = () => {
    const url = prompt("Digite a URL do link:")
    if (url) {
      const text = window.getSelection()?.toString() || "Link"
      const link = `<a href="${url}" target="_blank" style="color: #3b82f6; text-decoration: underline;">${text}</a>`
      document.execCommand("insertHTML", false, link)
    }
    editorRef.current?.focus()
  }

  const changeTextColor = () => {
    const color = prompt("Digite a cor (ex: #ff0000 ou red):")
    if (color) {
      execCommand("foreColor", color)
    }
  }

  const changeBackgroundColor = () => {
    const color = prompt("Digite a cor de fundo (ex: #ffff00 ou yellow):")
    if (color) {
      execCommand("backColor", color)
    }
  }

  const changeFontSize = () => {
    const size = prompt("Digite o tamanho da fonte (1-7):")
    if (size && Number.parseInt(size) >= 1 && Number.parseInt(size) <= 7) {
      execCommand("fontSize", size)
    }
  }

  const insertHeading = (level: number) => {
    const text = window.getSelection()?.toString() || `Título ${level}`
    const heading = `<h${level} style="margin: 20px 0 10px 0; font-weight: bold; color: #1f2937;">${text}</h${level}>`
    document.execCommand("insertHTML", false, heading)
    editorRef.current?.focus()
  }

  const insertQuote = () => {
    const text = window.getSelection()?.toString() || "Citação"
    const quote = `<blockquote style="border-left: 4px solid #3b82f6; padding-left: 16px; margin: 16px 0; font-style: italic; color: #6b7280;">${text}</blockquote>`
    document.execCommand("insertHTML", false, quote)
    editorRef.current?.focus()
  }

  const insertCodeBlock = () => {
    const code = prompt("Digite o código:")
    if (code) {
      const codeBlock = `<pre style="background: #f3f4f6; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0;"><code>${code}</code></pre>`
      document.execCommand("insertHTML", false, codeBlock)
    }
    editorRef.current?.focus()
  }

  const savePost = async () => {
    if (!title.trim()) {
      toast.error("Título é obrigatório")
      return
    }

    if (!editorRef.current?.innerHTML.trim()) {
      toast.error("Conteúdo é obrigatório")
      return
    }

    setIsSaving(true)
    try {
      const slug = title
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim()

      const postData = {
        title,
        slug,
        content: editorRef.current?.innerHTML || "",
        excerpt: excerpt || title.substring(0, 150),
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        published: isPublished,
        author_id: "current-user-id", // Substituir pelo ID do usuário atual
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      const { error } = await supabase.from("blog_posts").insert([postData])

      if (error) throw error

      toast.success("Post salvo com sucesso!")

      // Limpar formulário
      setTitle("")
      setContent("")
      setExcerpt("")
      setTags("")
      setIsPublished(false)
      if (editorRef.current) {
        editorRef.current.innerHTML = ""
      }
    } catch (error) {
      console.error("Erro ao salvar post:", error)
      toast.error("Erro ao salvar post")
    } finally {
      setIsSaving(false)
    }
  }

  const getPreviewContent = () => {
    return {
      title,
      content: editorRef.current?.innerHTML || "",
      excerpt: excerpt || title.substring(0, 150),
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      created_at: new Date().toISOString(),
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Editor Avançado</h1>
          <p className="text-gray-600">Crie e edite posts com editor visual completo</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
            <Eye className="h-4 w-4 mr-2" />
            {showPreview ? "Ocultar Preview" : "Mostrar Preview"}
          </Button>
          <Button onClick={savePost} disabled={isSaving} className="bg-[#4ade80] hover:bg-[#3dc76a]">
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Salvando..." : "Salvar Post"}
          </Button>
        </div>
      </div>

      <div className={`grid ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-6`}>
        {/* Editor */}
        <div className="space-y-4">
          {/* Metadados do Post */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Informações do Post</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Título</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Digite o título do post..."
                  className="text-lg"
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Resumo (opcional)</label>
                <Input
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Breve descrição do post..."
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Tags (separadas por vírgula)</label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="contabilidade, impostos, dicas..."
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="published"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="published" className="text-sm font-medium">
                  Publicar imediatamente
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Editor de Conteúdo */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Conteúdo</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Toolbar */}
              <div className="border rounded-t-lg p-3 bg-gray-50 flex flex-wrap gap-1">
                {/* Formatação de Texto */}
                <div className="flex gap-1 border-r pr-2 mr-2">
                  <Button size="sm" variant="ghost" onClick={() => execCommand("bold")} title="Negrito">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => execCommand("italic")} title="Itálico">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => execCommand("underline")} title="Sublinhado">
                    <Underline className="h-4 w-4" />
                  </Button>
                </div>

                {/* Títulos */}
                <div className="flex gap-1 border-r pr-2 mr-2">
                  <Button size="sm" variant="ghost" onClick={() => insertHeading(1)} title="Título 1">
                    H1
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => insertHeading(2)} title="Título 2">
                    H2
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => insertHeading(3)} title="Título 3">
                    H3
                  </Button>
                </div>

                {/* Alinhamento */}
                <div className="flex gap-1 border-r pr-2 mr-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => execCommand("justifyLeft")}
                    title="Alinhar à esquerda"
                  >
                    <AlignLeft className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => execCommand("justifyCenter")} title="Centralizar">
                    <AlignCenter className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => execCommand("justifyRight")}
                    title="Alinhar à direita"
                  >
                    <AlignRight className="h-4 w-4" />
                  </Button>
                </div>

                {/* Listas */}
                <div className="flex gap-1 border-r pr-2 mr-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => execCommand("insertUnorderedList")}
                    title="Lista com marcadores"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => execCommand("insertOrderedList")}
                    title="Lista numerada"
                  >
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                </div>

                {/* Cores e Fonte */}
                <div className="flex gap-1 border-r pr-2 mr-2">
                  <Button size="sm" variant="ghost" onClick={changeFontSize} title="Tamanho da fonte">
                    <Type className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={changeTextColor} title="Cor do texto">
                    <Palette className="h-4 w-4" />
                  </Button>
                </div>

                {/* Inserções */}
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={insertLink} title="Inserir link">
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                  <Dialog open={showGallery} onOpenChange={setShowGallery}>
                    <DialogTrigger asChild>
                      <Button size="sm" variant="ghost" title="Inserir imagem">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl">
                      <DialogHeader>
                        <DialogTitle>Galeria de Imagens</DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-h-96 overflow-y-auto">
                        {galleryImages.map((image) => (
                          <div
                            key={image.id}
                            className="cursor-pointer group relative"
                            onClick={() => insertImage(image.url)}
                          >
                            <img
                              src={image.url || "/placeholder.svg"}
                              alt={image.name}
                              className="w-full h-24 object-cover rounded-lg group-hover:opacity-75 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                              <span className="text-white text-sm">Inserir</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="ghost" onClick={insertQuote} title="Inserir citação">
                    <Quote className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="ghost" onClick={insertCodeBlock} title="Inserir código">
                    <Code className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Área de Edição */}
              <div
                ref={editorRef}
                contentEditable
                className="min-h-[400px] p-4 border border-t-0 rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 prose max-w-none"
                style={{
                  lineHeight: "1.6",
                  fontSize: "16px",
                }}
                placeholder="Comece a escrever seu post aqui..."
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Preview */}
        {showPreview && (
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Preview do Post
                </CardTitle>
              </CardHeader>
              <CardContent>
                <article className="prose max-w-none">
                  <h1 className="text-3xl font-bold mb-4">{title || "Título do Post"}</h1>

                  {excerpt && <p className="text-lg text-gray-600 mb-6 italic">{excerpt}</p>}

                  <div className="mb-6">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: editorRef.current?.innerHTML || "<p>Conteúdo aparecerá aqui...</p>",
                      }}
                    />
                  </div>

                  {tags && (
                    <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t">
                      {tags.split(",").map((tag, index) => (
                        <Badge key={index} variant="secondary">
                          {tag.trim()}
                        </Badge>
                      ))}
                    </div>
                  )}
                </article>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
