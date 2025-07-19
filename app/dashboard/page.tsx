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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, Search, Plus, Users, Calendar, Building, RefreshCw, FileText } from "lucide-react"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { toast } from "sonner"
import Link from "next/link"
import { useUser } from "@clerk/nextjs"
import ContactForm from "@/components/contact-form"
import ContactDetails from "@/components/contact-details"
import EditContactForm from "@/components/edit-contact-form"
import {
  getContacts,
  searchContacts,
  createContact,
  updateContact,
  deleteContact,
  getContactStats,
  type Contact,
} from "@/lib/supabase"
import { getBlogStats } from "@/lib/blog-supabase"

export default function Dashboard() {
  const { user } = useUser()
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    total_contacts: 0,
    novos: 0,
    contatados: 0,
    clientes: 0,
  })
  const [blogStats, setBlogStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
  })

  // Carregar dados iniciais
  useEffect(() => {
    loadContacts()
    loadStats()
    loadBlogStats()
  }, [])

  // Filtrar contatos quando o termo de busca muda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredContacts(contacts)
    } else {
      handleSearch()
    }
  }, [searchTerm, contacts])

  const loadContacts = async () => {
    try {
      setLoading(true)
      const data = await getContacts()
      setContacts(data)
      setFilteredContacts(data)
    } catch (error) {
      toast.error("Erro ao carregar contatos")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const loadStats = async () => {
    try {
      const data = await getContactStats()
      setStats(data)
    } catch (error) {
      console.error("Erro ao carregar estatísticas:", error)
    }
  }

  const loadBlogStats = async () => {
    try {
      const data = await getBlogStats()
      setBlogStats(data)
    } catch (error) {
      console.error("Erro ao carregar estatísticas do blog:", error)
    }
  }

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setFilteredContacts(contacts)
      return
    }

    try {
      const data = await searchContacts(searchTerm)
      setFilteredContacts(data)
    } catch (error) {
      toast.error("Erro ao buscar contatos")
      console.error(error)
    }
  }

  const handleAddContact = async (contactData: Omit<Contact, "id" | "created_at" | "updated_at">) => {
    try {
      const newContact = await createContact(contactData)
      setContacts((prev) => [newContact, ...prev])
      setIsAddOpen(false)
      toast.success("Contato adicionado com sucesso!")
      loadStats()
    } catch (error) {
      toast.error("Erro ao adicionar contato")
      console.error(error)
    }
  }

  const handleEditContact = async (contactData: Partial<Contact>) => {
    if (!selectedContact) return

    try {
      const updatedContact = await updateContact(selectedContact.id, contactData)
      setContacts((prev) => prev.map((contact) => (contact.id === selectedContact.id ? updatedContact : contact)))
      setIsEditOpen(false)
      setSelectedContact(null)
      toast.success("Contato atualizado com sucesso!")
      loadStats()
    } catch (error) {
      toast.error("Erro ao atualizar contato")
      console.error(error)
    }
  }

  const handleDeleteContact = async (id: string) => {
    try {
      await deleteContact(id)
      setContacts((prev) => prev.filter((contact) => contact.id !== id))
      toast.success("Contato excluído com sucesso!")
      loadStats()
    } catch (error) {
      toast.error("Erro ao excluir contato")
      console.error(error)
    }
  }

  const getStatusColor = (status: Contact["status"]) => {
    switch (status) {
      case "novo":
        return "bg-blue-100 text-blue-800"
      case "contatado":
        return "bg-yellow-100 text-yellow-800"
      case "cliente":
        return "bg-green-100 text-green-800"
      case "perdido":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCategoryLabel = (category: string) => {
    const labels = {
      mei: "MEI",
      microempresa: "Microempresa",
      "pequena-empresa": "Pequena Empresa",
      "media-empresa": "Média Empresa",
      "grande-empresa": "Grande Empresa",
      "pessoa-fisica": "Pessoa Física",
    }
    return labels[category] || category
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
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-[#1e3352] to-[#4ade80] rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Bem-vindo, {user?.firstName || user?.emailAddresses[0]?.emailAddress}! 👋
        </h2>
        <p className="text-white/90">
          Aqui você pode gerenciar todos os contatos e posts do blog da ON4 Contabilidade.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contatos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total_contacts}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Contatos</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.novos}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Posts do Blog</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{blogStats.total}</div>
            <p className="text-xs text-muted-foreground">{blogStats.published} publicados</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Building className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.clientes}</div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>Acesse as principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/blog">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Gerenciar Blog
              </Button>
            </Link>
            <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
              <DialogTrigger asChild>
                <Button className="w-full justify-start bg-[#4ade80] hover:bg-[#3dc76a]">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Contato
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Adicionar Novo Contato</DialogTitle>
                  <DialogDescription>Preencha os dados do novo contato</DialogDescription>
                </DialogHeader>
                <ContactForm onSubmit={handleAddContact} />
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
            <CardDescription>Últimas ações no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Sistema integrado com Supabase</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Blog conectado ao banco de dados</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Autenticação Clerk configurada</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Contacts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Contatos Recentes</CardTitle>
              <CardDescription>Últimos contatos cadastrados no sistema</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar contatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.slice(0, 5).map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{getCategoryLabel(contact.category)}</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
                    </TableCell>
                    <TableCell>{format(new Date(contact.created_at), "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedContact(contact)
                            setIsDetailsOpen(true)
                          }}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedContact(contact)
                            setIsEditOpen(true)
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {filteredContacts.length > 5 && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">Mostrando 5 de {filteredContacts.length} contatos</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do Contato</DialogTitle>
          </DialogHeader>
          {selectedContact && <ContactDetails contact={selectedContact} onClose={() => setIsDetailsOpen(false)} />}
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Contato</DialogTitle>
            <DialogDescription>Atualize as informações do contato</DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <EditContactForm
              contact={selectedContact}
              onSubmit={handleEditContact}
              onCancel={() => setIsEditOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
