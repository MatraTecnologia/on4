import { NextResponse } from "next/server"

// Dados mockados para desenvolvimento
const mockUsers = [
  {
    id: "user_1",
    firstName: "Admin",
    lastName: "User",
    emailAddresses: [{ emailAddress: "admin@on4contabilidade.com.br" }],
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    publicMetadata: { role: "admin" },
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    lastSignInAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "user_2",
    firstName: "Editor",
    lastName: "Silva",
    emailAddresses: [{ emailAddress: "editor@on4contabilidade.com.br" }],
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=editor",
    publicMetadata: { role: "editor" },
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    lastSignInAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "user_3",
    firstName: "Viewer",
    lastName: "Santos",
    emailAddresses: [{ emailAddress: "viewer@on4contabilidade.com.br" }],
    imageUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=viewer",
    publicMetadata: { role: "viewer" },
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    lastSignInAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
]

export async function GET() {
  try {
    // Para desenvolvimento, usar dados mockados
    const users = mockUsers

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return NextResponse.json({ error: "Erro ao buscar usuários" }, { status: 500 })
  }
}
