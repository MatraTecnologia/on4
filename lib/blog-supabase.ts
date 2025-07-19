import { supabase } from "./supabase"

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  author: string
  category: string
  tags: string[]
  read_time: number
  published: boolean
  featured: boolean
  created_at: string
  updated_at: string
  published_at?: string
}

// Função para buscar posts publicados (para o site público)
export async function getPublishedBlogPosts() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar posts publicados:", error)
      return []
    }

    return data as BlogPost[]
  } catch (error) {
    console.error("Erro ao buscar posts publicados:", error)
    return []
  }
}

// Função para buscar um post específico pelo slug
export async function getBlogPostBySlug(slug: string) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("published", true)
      .single()

    if (error) {
      console.error("Erro ao buscar post:", error)
      return null
    }

    return data as BlogPost
  } catch (error) {
    console.error("Erro ao buscar post:", error)
    return null
  }
}

// Função para buscar posts relacionados
export async function getRelatedBlogPosts(currentSlug: string, category: string, limit = 3) {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .eq("category", category)
      .neq("slug", currentSlug)
      .limit(limit)
      .order("published_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar posts relacionados:", error)
      return []
    }

    return data as BlogPost[]
  } catch (error) {
    console.error("Erro ao buscar posts relacionados:", error)
    return []
  }
}

// Função para buscar post em destaque
export async function getFeaturedBlogPost() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("published", true)
      .eq("featured", true)
      .order("published_at", { ascending: false })
      .limit(1)
      .single()

    if (error) {
      console.error("Erro ao buscar post em destaque:", error)
      return null
    }

    return data as BlogPost
  } catch (error) {
    console.error("Erro ao buscar post em destaque:", error)
    return null
  }
}

// FUNÇÕES PARA O DASHBOARD (ADMIN)

// Função para buscar todos os posts (incluindo rascunhos)
export async function getAllBlogPosts() {
  try {
    const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Erro ao buscar todos os posts:", error)
      return []
    }

    return data as BlogPost[]
  } catch (error) {
    console.error("Erro ao buscar todos os posts:", error)
    return []
  }
}

// Função para criar um novo post
export async function createBlogPost(post: Omit<BlogPost, "id" | "created_at" | "updated_at">) {
  try {
    const { data, error } = await supabase.from("blog_posts").insert([post]).select().single()

    if (error) {
      console.error("Erro ao criar post:", error)
      throw error
    }

    return data as BlogPost
  } catch (error) {
    console.error("Erro ao criar post:", error)
    throw error
  }
}

// Função para atualizar um post
export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  try {
    const { data, error } = await supabase.from("blog_posts").update(updates).eq("id", id).select().single()

    if (error) {
      console.error("Erro ao atualizar post:", error)
      throw error
    }

    return data as BlogPost
  } catch (error) {
    console.error("Erro ao atualizar post:", error)
    throw error
  }
}

// Função para deletar um post
export async function deleteBlogPost(id: string) {
  try {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id)

    if (error) {
      console.error("Erro ao deletar post:", error)
      throw error
    }
  } catch (error) {
    console.error("Erro ao deletar post:", error)
    throw error
  }
}

// Função para buscar posts com filtro
export async function searchBlogPosts(searchTerm = "", published?: boolean) {
  try {
    let query = supabase.from("blog_posts").select("*").order("created_at", { ascending: false })

    if (searchTerm) {
      query = query.or(`title.ilike.%${searchTerm}%,excerpt.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
    }

    if (published !== undefined) {
      query = query.eq("published", published)
    }

    const { data, error } = await query

    if (error) {
      console.error("Erro ao buscar posts:", error)
      return []
    }

    return data as BlogPost[]
  } catch (error) {
    console.error("Erro ao buscar posts:", error)
    return []
  }
}

// Função para obter estatísticas do blog
export async function getBlogStats() {
  try {
    const { data, error } = await supabase.from("blog_posts").select("published")

    if (error) {
      console.error("Erro ao buscar estatísticas:", error)
      return {
        total: 0,
        published: 0,
        drafts: 0,
      }
    }

    const total = data.length
    const published = data.filter((post) => post.published).length
    const drafts = total - published

    return {
      total,
      published,
      drafts,
    }
  } catch (error) {
    console.error("Erro ao buscar estatísticas:", error)
    return {
      total: 0,
      published: 0,
      drafts: 0,
    }
  }
}

// Função para gerar slug único
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove acentos
    .replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
    .replace(/\s+/g, "-") // Substitui espaços por hífens
    .replace(/-+/g, "-") // Remove hífens duplicados
    .trim()
}

// Função para calcular tempo de leitura
export function calculateReadTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}
