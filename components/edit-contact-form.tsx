"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface Contact {
  id: string
  name: string
  email: string
  category: string
  employees: string
  createdAt: Date
  status: "novo" | "contatado" | "cliente" | "perdido"
  notes?: string
}

interface EditContactFormProps {
  contact: Contact
  onSubmit: (data: Partial<Contact>) => void
  onCancel: () => void
}

export default function EditContactForm({ contact, onSubmit, onCancel }: EditContactFormProps) {
  const [formData, setFormData] = useState({
    name: contact.name,
    email: contact.email,
    category: contact.category,
    employees: contact.employees,
    status: contact.status,
    notes: contact.notes || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome/Empresa *</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Digite o nome ou empresa"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Digite o email"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Categoria *</Label>
          <Select onValueChange={(value) => handleSelectChange("category", value)} value={formData.category}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mei">MEI</SelectItem>
              <SelectItem value="microempresa">Microempresa</SelectItem>
              <SelectItem value="pequena-empresa">Pequena Empresa</SelectItem>
              <SelectItem value="media-empresa">Média Empresa</SelectItem>
              <SelectItem value="grande-empresa">Grande Empresa</SelectItem>
              <SelectItem value="pessoa-fisica">Pessoa Física</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employees">Número de Funcionários *</Label>
          <Select onValueChange={(value) => handleSelectChange("employees", value)} value={formData.employees}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione o número de funcionários" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">0 funcionários</SelectItem>
              <SelectItem value="1-5">1-5 funcionários</SelectItem>
              <SelectItem value="6-10">6-10 funcionários</SelectItem>
              <SelectItem value="11-20">11-20 funcionários</SelectItem>
              <SelectItem value="21-50">21-50 funcionários</SelectItem>
              <SelectItem value="51-100">51-100 funcionários</SelectItem>
              <SelectItem value="100+">Mais de 100 funcionários</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select onValueChange={(value) => handleSelectChange("status", value)} value={formData.status}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="novo">Novo</SelectItem>
            <SelectItem value="contatado">Contatado</SelectItem>
            <SelectItem value="cliente">Cliente</SelectItem>
            <SelectItem value="perdido">Perdido</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Observações</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Observações adicionais"
          rows={4}
        />
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" className="bg-[#4ade80] hover:bg-[#3dc76a]">
          Salvar Alterações
        </Button>
      </div>
    </form>
  )
}
