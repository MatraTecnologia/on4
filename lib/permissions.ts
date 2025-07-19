import { auth, currentUser } from "@clerk/nextjs/server"

export type Role = "admin" | "editor" | "viewer"

export interface Permission {
  manage_users: boolean
  manage_blog: boolean
  manage_contacts: boolean
  manage_gallery: boolean
  view_reports: boolean
  edit_settings: boolean
}

const rolePermissions: Record<Role, Permission> = {
  admin: {
    manage_users: true,
    manage_blog: true,
    manage_contacts: true,
    manage_gallery: true,
    view_reports: true,
    edit_settings: true,
  },
  editor: {
    manage_users: false,
    manage_blog: true,
    manage_contacts: true,
    manage_gallery: true,
    view_reports: true,
    edit_settings: false,
  },
  viewer: {
    manage_users: false,
    manage_blog: false,
    manage_contacts: false,
    manage_gallery: false,
    view_reports: true,
    edit_settings: false,
  },
}

export async function hasPermission(permission: keyof Permission): Promise<boolean> {
  try {
    const { userId } = await auth()
    if (!userId) return false

    const user = await currentUser()
    if (!user) return false

    const role = (user.publicMetadata?.role as Role) || "viewer"
    return rolePermissions[role][permission]
  } catch (error) {
    console.error("Erro ao verificar permissão:", error)
    return false
  }
}

export async function getUserRole(): Promise<Role> {
  try {
    const user = await currentUser()
    return (user?.publicMetadata?.role as Role) || "viewer"
  } catch (error) {
    console.error("Erro ao obter role do usuário:", error)
    return "viewer"
  }
}

export function hasRolePermission(role: Role, permission: keyof Permission): boolean {
  return rolePermissions[role][permission]
}
