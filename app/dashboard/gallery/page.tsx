"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Upload, Search, Trash2, Eye, Copy, Grid, List, RefreshCw, Plus } from "lucide-react"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

interface GalleryImage {
  id: string
  name: string
  url: string
  size: number
  type: string
  created_at: string
  metadata?: any
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filteredImages, setFilteredImages] = useState<GalleryImage[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [filterType, setFilterType] = useState("all")

  useEffect(() => {
    loadImages()
  }, [])

  useEffect(() => {
    filterImages()
  }, [searchTerm, filterType, images])

  const loadImages = async () => {
    try {
      setLoading(true)

      const { data, error } = await supabase.storage.from("galeria").list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      })

      if (error) throw error

      const imagesWithUrls = await Promise.all(
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
            metadata: file.metadata,
          }
        }),
      )

      // Filtrar apenas arquivos de imagem
      const imageFiles = imagesWithUrls.filter((file) => file.name.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i))

      setImages(imageFiles)
    } catch (error) {
      toast.error("Erro ao carregar imagens")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const filterImages = () => {
    let filtered = images

    if (searchTerm.trim()) {
      filtered = filtered.filter((img) => img.name.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    if (filterType !== "all") {
      filtered = filtered.filter((img) => img.type.includes(filterType))
    }

    setFilteredImages(filtered)
  }

  const handleUpload = async (files: FileList) => {
    setIsUploading(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Gerar nome único para evitar conflitos
        const fileExt = file.name.split(".").pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`

        const { data, error } = await supabase.storage.from("galeria").upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        })

        if (error) throw error
        return data
      })

      await Promise.all(uploadPromises)
      toast.success(`${files.length} imagem(ns) enviada(s) com sucesso!`)
      await loadImages() // Recarregar a lista
    } catch (error) {
      toast.error("Erro ao fazer upload")
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  const copyImageUrl = (url: string) => {
    navigator.clipboard.writeText(url)
    toast.success("URL copiada para a área de transferência!")
  }

  const deleteImage = async (fileName: string) => {
    try {
      const { error } = await supabase.storage.from("galeria").remove([fileName])

      if (error) throw error

      setImages((prev) => prev.filter((img) => img.name !== fileName))
      toast.success("Imagem excluída com sucesso!")
    } catch (error) {
      toast.error("Erro ao excluir imagem")
      console.error(error)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const getImageStats = () => {
    const totalSize = images.reduce((acc, img) => acc + img.size, 0)
    const jpegCount = images.filter((img) => img.type.includes("jpeg")).length
    const pngCount = images.filter((img) => img.type.includes("png")).length
    const gifCount = images.filter((img) => img.type.includes("gif")).length
    const webpCount = images.filter((img) => img.type.includes("webp")).length

    return { totalSize, jpegCount, pngCount, gifCount, webpCount }
  }

  const stats = getImageStats()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <RefreshCw className="h-6 w-6 animate-spin" />
          <span>Carregando galeria...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Galeria de Imagens</h1>
          <p className="text-gray-600">Gerencie todas as imagens e banners do site</p>
        </div>
        <div className="flex gap-2">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && handleUpload(e.target.files)}
            className="hidden"
            id="upload-input"
          />
          <Button asChild disabled={isUploading} className="bg-[#4ade80] hover:bg-[#3dc76a]">
            <label htmlFor="upload-input" className="cursor-pointer">
              {isUploading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Upload className="h-4 w-4 mr-2" />}
              {isUploading ? "Enviando..." : "Upload de Imagens"}
            </label>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{images.length}</div>
            <p className="text-xs text-gray-500">imagens</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Espaço</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatFileSize(stats.totalSize)}</div>
            <p className="text-xs text-gray-500">usado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">JPEG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.jpegCount}</div>
            <p className="text-xs text-gray-500">arquivos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">PNG</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pngCount}</div>
            <p className="text-xs text-gray-500">arquivos</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Outros</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.gifCount + stats.webpCount}</div>
            <p className="text-xs text-gray-500">arquivos</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Filtros e Busca</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por nome do arquivo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">Todos os tipos</option>
                <option value="jpeg">JPEG</option>
                <option value="png">PNG</option>
                <option value="gif">GIF</option>
                <option value="webp">WebP</option>
              </select>
              <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}>
                {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Galeria</CardTitle>
              <CardDescription>{filteredImages.length} imagem(ns) encontrada(s)</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={loadImages}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Atualizar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {filteredImages.length === 0 ? (
            <div className="text-center py-12">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma imagem encontrada</h3>
              <p className="text-gray-500 mb-4">upload de suas primeiras imagens para começar</p>
              <Button asChild className="bg-[#4ade80] hover:bg-[#3dc76a]">
                <label htmlFor="upload-input" className="cursor-pointer">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Imagens
                </label>
              </Button>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {filteredImages.map((image) => (
                <div key={image.id} className="group relative">
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                    <Button size="sm" variant="secondary" onClick={() => setSelectedImage(image)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="secondary" onClick={() => copyImageUrl(image.url)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => deleteImage(image.name)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium truncate">{image.name}</p>
                    <p className="text-xs text-gray-500">{formatFileSize(image.size)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredImages.map((image) => (
                <div key={image.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={image.url || "/placeholder.svg"}
                      alt={image.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{image.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{image.type}</Badge>
                      <span className="text-xs text-gray-500">{formatFileSize(image.size)}</span>
                      <span className="text-xs text-gray-500">
                        {new Date(image.created_at).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => setSelectedImage(image)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => copyImageUrl(image.url)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => deleteImage(image.name)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Image Details Dialog */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Detalhes da Imagem</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedImage.url || "/placeholder.svg"}
                  alt={selectedImage.name}
                  className="w-full rounded-lg max-h-96 object-contain"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Nome do Arquivo</label>
                  <p className="text-sm text-gray-600">{selectedImage.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Tipo</label>
                  <p className="text-sm text-gray-600">{selectedImage.type}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Tamanho</label>
                  <p className="text-sm text-gray-600">{formatFileSize(selectedImage.size)}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Data de Upload</label>
                  <p className="text-sm text-gray-600">{new Date(selectedImage.created_at).toLocaleString("pt-BR")}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">URL Pública</label>
                  <div className="flex gap-2">
                    <Input value={selectedImage.url} readOnly className="text-xs" />
                    <Button size="sm" onClick={() => copyImageUrl(selectedImage.url)}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
