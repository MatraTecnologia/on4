"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoreHorizontal, Search, UserPlus, AlertTriangle } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"

// Tipos
interface User {
  id: string
  firstName?: string
  lastName?: string
  emailAddresses: { emailAddress: string }[]
  imageUrl?: string
  publicMetadata: {
    role?: string
    banned?: boolean
  }
  createdAt: string
  lastSignInAt?: string
}

interface Invitation {
  id: string
  emailAddress: string
  publicMetadata: {
    role?: string
  }
  createdAt: string
  status: string
}

// Função para buscar usuários
async function fetchUsers() {
  try {
    const response = await fetch("/api/users")
    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    return data.users as User[]
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    throw error
  }
}

// Função para enviar convite
async function sendInvitation(email: string, role: string, firstName?: string, lastName?: string) {
  try {
    const response = await fetch("/api/users/invite", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, role, firstName, lastName }),
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data.invitation as Invitation
  } catch (error) {
    console.error("Erro ao enviar convite:", error)
    throw error
  }
}

// Função para atualizar papel do usuário
async function updateUserRole(userId: string, role: string) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ role }),
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    console.error("Erro ao atualizar papel do usuário:", error)
    throw error
  }
}

// Função para banir usuário
async function banUser(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}/ban`, {
      method: "POST",
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    console.error("Erro ao banir usuário:", error)
    throw error
  }
}

// Função para desbanir usuário
async function unbanUser(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}/unban`, {
      method: "POST",
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data.user
  } catch (error) {
    console.error("Erro ao desbanir usuário:", error)
    throw error
  }
}

// Função para deletar usuário
async function deleteUser(userId: string) {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return data.success
  } catch (error) {
    console.error("Erro ao deletar usuário:", error)
    throw error
  }
}

// Componente principal
export default function UsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null)

  // Form states
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("viewer")
  const [inviteFirstName, setInviteFirstName] = useState("")
  const [inviteLastName, setInviteLastName] = useState("")

  // Carregar usuários
  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true)
        const fetchedUsers = await fetchUsers()
        setUsers(fetchedUsers)

        // Simular convites para desenvolvimento
        setInvitations([
          {
            id: "inv_1",
            emailAddress: "pendente@on4contabilidade.com.br",
            publicMetadata: { role: "editor" },
            createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
            status: "pending",
          },
        ])
      } catch (error) {
        toast.error("Erro ao carregar usuários")
      } finally {
        setLoading(false)
      }
    }

    loadUsers()
  }, [])

  // Filtrar usuários
  const filteredUsers = users.filter((user) => {
    const fullName = `${user.firstName || ""} ${user.lastName || ""}`.toLowerCase()
    const email = user.emailAddresses[0]?.emailAddress.toLowerCase() || ""
    const role = user.publicMetadata?.role?.toLowerCase() || ""

    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase()) ||
      role.includes(searchTerm.toLowerCase())
    )
  })

  // Enviar convite
  const handleSendInvite = async () => {
    try {
      if (!inviteEmail || !inviteRole) {
        toast.error("Email e papel são obrigatórios")
        return
      }

      const invitation = await sendInvitation(inviteEmail, inviteRole, inviteFirstName, inviteLastName)
      setInvitations((prev) => [...prev, invitation])
      toast.success("Convite enviado com sucesso")

      // Limpar formulário
      setInviteEmail("")
      setInviteRole("viewer")
      setInviteFirstName("")
      setInviteLastName("")
      setIsInviteDialogOpen(false)
    } catch (error) {
      toast.error("Erro ao enviar convite")
    }
  }

  // Atualizar papel do usuário
  const handleUpdateRole = async (userId: string, role: string) => {
    try {
      await updateUserRole(userId, role)
      setUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, publicMetadata: { ...user.publicMetadata, role } } : user)),
      )
      toast.success("Papel atualizado com sucesso")
    } catch (error) {
      toast.error("Erro ao atualizar papel")
    }
  }

  // Banir usuário
  const handleBanUser = async (userId: string) => {
    try {
      await banUser(userId)
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, publicMetadata: { ...user.publicMetadata, banned: true } } : user,
        ),
      )
      toast.success("Usuário banido com sucesso")
    } catch (error) {
      toast.error("Erro ao banir usuário")
    }
  }

  // Desbanir usuário
  const handleUnbanUser = async (userId: string) => {
    try {
      await unbanUser(userId)
      setUsers((prev) =>
        prev.map((user) =>
          user.id === userId ? { ...user, publicMetadata: { ...user.publicMetadata, banned: false } } : user,
        ),
      )
      toast.success("Usuário desbanido com sucesso")
    } catch (error) {
      toast.error("Erro ao desbanir usuário")
    }
  }

  // Deletar usuário
  const handleDeleteUser = async () => {
    try {
      if (!selectedUserId) return

      await deleteUser(selectedUserId)
      setUsers((prev) => prev.filter((user) => user.id !== selectedUserId))
      toast.success("Usuário deletado com sucesso")
      setIsDeleteDialogOpen(false)
      setSelectedUserId(null)
    } catch (error) {
      toast.error("Erro ao deletar usuário")
    }
  }

  // Renderizar
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Gerenciamento de Usuários</h1>
          <p className="text-muted-foreground">Gerencie usuários e permissões do sistema</p>
        </div>
        <Button onClick={() => setIsInviteDialogOpen(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Convidar Usuário
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar usuários..."
          className="pl-10"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <Tabs defaultValue="users">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="invitations">Convites</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader className="h-24 bg-muted/20"></CardHeader>
                  <CardContent className="h-32 bg-muted/10"></CardContent>
                </Card>
              ))}
            </div>
          ) : filteredUsers.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-muted-foreground">Nenhum usuário encontrado</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user) => (
                <Card key={user.id} className={user.publicMetadata?.banned ? "border-destructive/50" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={user.imageUrl || "/placeholder.svg"} />
                        <AvatarFallback>
                          {user.firstName?.[0] || ""}
                          {user.lastName?.[0] || ""}
                        </AvatarFallback>
                      </Avatar>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Ações</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleUpdateRole(user.id, "admin")}
                            disabled={user.publicMetadata?.role === "admin"}
                          >
                            Tornar Admin
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateRole(user.id, "editor")}
                            disabled={user.publicMetadata?.role === "editor"}
                          >
                            Tornar Editor
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleUpdateRole(user.id, "viewer")}
                            disabled={user.publicMetadata?.role === "viewer"}
                          >
                            Tornar Viewer
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {user.publicMetadata?.banned ? (
                            <DropdownMenuItem onClick={() => handleUnbanUser(user.id)}>
                              Desbanir Usuário
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem onClick={() => handleBanUser(user.id)}>Banir Usuário</DropdownMenuItem>
                          )}
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedUserId(user.id)
                              setIsDeleteDialogOpen(true)
                            }}
                            className="text-destructive"
                          >
                            Excluir Usuário
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardTitle className="text-lg">
                      {user.firstName} {user.lastName}
                    </CardTitle>
                    <CardDescription>{user.emailAddresses[0]?.emailAddress}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Papel</span>
                        <Badge
                          variant={
                            user.publicMetadata?.role === "admin"
                              ? "default"
                              : user.publicMetadata?.role === "editor"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {user.publicMetadata?.role || "viewer"}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        {user.publicMetadata?.banned ? (
                          <Badge variant="destructive">Banido</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                            Ativo
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    <div className="w-full flex justify-between">
                      <span>Criado: {format(new Date(user.createdAt), "dd/MM/yyyy", { locale: ptBR })}</span>
                      {user.lastSignInAt && (
                        <span>Último login: {format(new Date(user.lastSignInAt), "dd/MM/yyyy", { locale: ptBR })}</span>
                      )}
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="invitations">
          {invitations.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-10">
                <p className="text-muted-foreground">Nenhum convite pendente</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {invitations.map((invitation) => (
                <Card key={invitation.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{invitation.emailAddress}</CardTitle>
                      <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                        Pendente
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Papel</span>
                      <Badge
                        variant={
                          invitation.publicMetadata?.role === "admin"
                            ? "default"
                            : invitation.publicMetadata?.role === "editor"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {invitation.publicMetadata?.role || "viewer"}
                      </Badge>
                    </div>
                  </CardContent>
                  <CardFooter className="text-xs text-muted-foreground">
                    <div className="w-full flex justify-between">
                      <span>Enviado: {format(new Date(invitation.createdAt), "dd/MM/yyyy", { locale: ptBR })}</span>
                      <Button variant="ghost" size="sm" className="h-6 text-xs">
                        Reenviar
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog de convite */}
      <Dialog open={isInviteDialogOpen} onOpenChange={setIsInviteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Convidar Novo Usuário</DialogTitle>
            <DialogDescription>Envie um convite por email para adicionar um novo usuário ao sistema.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="email@exemplo.com"
                className="col-span-3"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                Nome
              </Label>
              <Input
                id="firstName"
                placeholder="Nome"
                className="col-span-3"
                value={inviteFirstName}
                onChange={(e) => setInviteFirstName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Sobrenome
              </Label>
              <Input
                id="lastName"
                placeholder="Sobrenome"
                className="col-span-3"
                value={inviteLastName}
                onChange={(e) => setInviteLastName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Papel
              </Label>
              <Select value={inviteRole} onValueChange={setInviteRole}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Selecione um papel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSendInvite}>Enviar Convite</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmação de exclusão */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Confirmar Exclusão
            </DialogTitle>
            <DialogDescription>
              Esta ação não pode ser desfeita. O usuário será permanentemente removido do sistema.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Tem certeza que deseja excluir este usuário?</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
