"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

interface ContactFormProps {
  onSubmit: (data: {
    name: string
    email: string
    category: string
    employees: string
    notes?: string
  }) => void
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    employees: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      name: "",
      email: "",
      category: "",
      employees: "",
      notes: "",
    })
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

      <div className="space-y-2">
        <Label htmlFor="notes">Observações</Label>
        <Textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Observações adicionais (opcional)"
          rows={3}
        />
      </div>

      <Button type="submit" className="w-full bg-[#4ade80] hover:bg-[#3dc76a]">
        Adicionar Contato
      </Button>
    </form>
  )
}
