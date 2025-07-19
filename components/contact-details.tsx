"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Mail, Building, Users, Calendar, FileText } from "lucide-react"
import type { Contact } from "@/lib/supabase"

interface ContactDetailsProps {
  contact: Contact
  onClose: () => void
}

export default function ContactDetails({ contact, onClose }: ContactDetailsProps) {
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

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{contact.name}</CardTitle>
            <Badge className={getStatusColor(contact.status)}>{contact.status}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-sm">{contact.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Building className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Categoria</p>
                <p className="text-sm">{getCategoryLabel(contact.category)}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Users className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Funcionários</p>
                <p className="text-sm">{contact.employees}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Calendar className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-500">Data de Cadastro</p>
                <p className="text-sm">
                  {format(new Date(contact.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                </p>
              </div>
            </div>
          </div>

          {contact.notes && (
            <>
              <Separator />
              <div className="flex items-start space-x-3">
                <FileText className="h-5 w-5 text-gray-500 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-500 mb-1">Observações</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{contact.notes}</p>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-3">
        <Button variant="outline" onClick={onClose}>
          Fechar
        </Button>
        <Button
          className="bg-[#4ade80] hover:bg-[#3dc76a]"
          onClick={() => window.open(`mailto:${contact.email}`, "_blank")}
        >
          Enviar Email
        </Button>
      </div>
    </div>
  )
}
