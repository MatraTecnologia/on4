import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase environment variables are missing. Using fallback values for development.")
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseAnonKey || "placeholder-key",
)

export interface Contact {
  id: string
  name: string
  email: string
  category: string
  employees: string
  status: "novo" | "contatado" | "cliente" | "perdido"
  notes?: string
  created_at: string
  updated_at: string
}

// Função para buscar todos os contatos
export async function getContacts() {
  const { data, error } = await supabase.from("contacts").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Erro ao buscar contatos:", error)
    throw error
  }

  return data as Contact[]
}

// Função para buscar contatos com filtro
export async function searchContacts(searchTerm = "") {
  let query = supabase.from("contacts").select("*").order("created_at", { ascending: false })

  if (searchTerm) {
    query = query.or(`name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`)
  }

  const { data, error } = await query

  if (error) {
    console.error("Erro ao buscar contatos:", error)
    throw error
  }

  return data as Contact[]
}

// Função para criar um novo contato
export async function createContact(contact: Omit<Contact, "id" | "created_at" | "updated_at">) {
  const { data, error } = await supabase.from("contacts").insert([contact]).select().single()

  if (error) {
    console.error("Erro ao criar contato:", error)
    throw error
  }

  return data as Contact
}

// Função para atualizar um contato
export async function updateContact(id: string, updates: Partial<Contact>) {
  const { data, error } = await supabase.from("contacts").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Erro ao atualizar contato:", error)
    throw error
  }

  return data as Contact
}

// Função para deletar um contato
export async function deleteContact(id: string) {
  const { error } = await supabase.from("contacts").delete().eq("id", id)

  if (error) {
    console.error("Erro ao deletar contato:", error)
    throw error
  }
}

// Função para obter estatísticas
export async function getContactStats() {
  const { data, error } = await supabase.from("contact_stats").select("*").single()

  if (error) {
    console.error("Erro ao buscar estatísticas:", error)
    throw error
  }

  return data
}
