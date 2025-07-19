import { supabase } from "./supabase"

export interface GalleryImage {
  id: string
  filename: string
  original_name: string
  file_path: string
  file_size: number
  mime_type: string
  alt_text?: string
  description?: string
  tags: string[]
  is_public: boolean
  uploaded_by: string
  created_at: string
  updated_at: string
}

// Função para fazer upload de uma imagem
export async function uploadImage(file: File, metadata: Partial<GalleryImage>) {
  try {
    const fileExt = file.name.split(".").pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `gallery/${fileName}`

    // Upload do arquivo para o Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage.from("galeria").upload(filePath, file)

    if (uploadError) {
      console.error("Erro no upload:", uploadError)
      throw uploadError
    }

    // Obter URL pública
    const { data: urlData } = supabase.storage.from("galeria").getPublicUrl(filePath)

    // Salvar metadados na tabela gallery
    const { data: dbData, error: dbError } = await supabase
      .from("gallery")
      .insert([
        {
          filename: fileName,
          original_name: file.name,
          file_path: filePath,
          file_size: file.size,
          mime_type: file.type,
          alt_text: metadata.alt_text || "",
          description: metadata.description || "",
          tags: metadata.tags || [],
          is_public: metadata.is_public || true,
          uploaded_by: metadata.uploaded_by || "system",
        },
      ])
      .select()
      .single()

    if (dbError) {
      console.error("Erro ao salvar metadados:", dbError)
      throw dbError
    }

    return {
      ...dbData,
      public_url: urlData.publicUrl,
    }
  } catch (error) {
    console.error("Erro no upload da imagem:", error)
    throw error
  }
}

// Função para listar todas as imagens
export async function getGalleryImages() {
  try {
    const { data, error } = await supabase.from("gallery").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar imagens:", error)
      return []
    }

    // Adicionar URLs públicas
    const imagesWithUrls = data.map((image) => ({
      ...image,
      public_url: supabase.storage.from("galeria").getPublicUrl(image.file_path).data.publicUrl,
    }))

    return imagesWithUrls
  } catch (error) {
    console.error("Erro ao buscar imagens:", error)
    return []
  }
}

// Função para buscar imagens públicas
export async function getPublicGalleryImages() {
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .eq("is_public", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar imagens públicas:", error)
      return []
    }

    // Adicionar URLs públicas
    const imagesWithUrls = data.map((image) => ({
      ...image,
      public_url: supabase.storage.from("galeria").getPublicUrl(image.file_path).data.publicUrl,
    }))

    return imagesWithUrls
  } catch (error) {
    console.error("Erro ao buscar imagens públicas:", error)
    return []
  }
}

// Função para deletar uma imagem
export async function deleteGalleryImage(id: string) {
  try {
    // Primeiro, buscar os dados da imagem
    const { data: imageData, error: fetchError } = await supabase
      .from("gallery")
      .select("file_path")
      .eq("id", id)
      .single()

    if (fetchError) {
      console.error("Erro ao buscar dados da imagem:", fetchError)
      throw fetchError
    }

    // Deletar arquivo do storage
    const { error: storageError } = await supabase.storage.from("galeria").remove([imageData.file_path])

    if (storageError) {
      console.error("Erro ao deletar arquivo do storage:", storageError)
      throw storageError
    }

    // Deletar registro da tabela
    const { error: dbError } = await supabase.from("gallery").delete().eq("id", id)

    if (dbError) {
      console.error("Erro ao deletar registro da tabela:", dbError)
      throw dbError
    }

    return true
  } catch (error) {
    console.error("Erro ao deletar imagem:", error)
    throw error
  }
}

// Função para atualizar metadados de uma imagem
export async function updateGalleryImage(id: string, updates: Partial<GalleryImage>) {
  try {
    const { data, error } = await supabase.from("gallery").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("Erro ao atualizar imagem:", error)
      throw error
    }

    return {
      ...data,
      public_url: supabase.storage.from("galeria").getPublicUrl(data.file_path).data.publicUrl,
    }
  } catch (error) {
    console.error("Erro ao atualizar imagem:", error)
    throw error
  }
}

// Função para buscar imagens por tags
export async function getImagesByTags(tags: string[]) {
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .overlaps("tags", tags)
      .eq("is_public", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar imagens por tags:", error)
      return []
    }

    // Adicionar URLs públicas
    const imagesWithUrls = data.map((image) => ({
      ...image,
      public_url: supabase.storage.from("galeria").getPublicUrl(image.file_path).data.publicUrl,
    }))

    return imagesWithUrls
  } catch (error) {
    console.error("Erro ao buscar imagens por tags:", error)
    return []
  }
}
