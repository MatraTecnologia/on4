"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import React, { useState } from "react"
import { toast } from "sonner"
import AnimatedElement from "./animated-element"
import { createContact } from "@/lib/supabase"

export default function HeroSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    category: "",
    employees: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Salvar no Supabase
      await createContact({
        name: formState.name,
        email: formState.email,
        category: formState.category,
        employees: formState.employees,
        status: "novo",
        notes: "Contato enviado pelo formulário do site",
      })

      setSubmitted(true)
      toast.success("Formulário enviado com sucesso! Entraremos em contato em breve.")

      // Reset após 3 segundos
      setTimeout(() => {
        setSubmitted(false)
        setFormState({
          name: "",
          email: "",
          category: "",
          employees: "",
        })
      }, 3000)
    } catch (error) {
      console.error("Erro ao enviar formulário:", error)
      toast.error("Erro ao enviar formulário. Tente novamente.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="text-white py-16 md:py-24 min-h-[600px] flex items-center">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <AnimatedElement animation="slide-up" duration={0.8} threshold={0.2}>
          <div className="space-y-6 max-w-xl">
            <AnimatedElement animation="fade-up" delay={0.2} threshold={0.3}>
              <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight">
                Tenha soluções contábeis completas
                <span className="block text-[#CFC1B3] mt-2">& descomplicadas</span>
              </h1>
            </AnimatedElement>
            <AnimatedElement animation="fade-up" delay={0.4} threshold={0.3}>
              <p className="text-lg text-gray-300 mt-6">
                Simplifique a gestão contábil da sua empresa com a nossa ajuda.
              </p>
            </AnimatedElement>
            <AnimatedElement animation="zoom-in" delay={0.6} threshold={0.3}>
              <a
                href="https://wa.me/554333240380?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%0AQuero%20falar%20com%20atendente"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#4ade80] hover:bg-[#3dc76a] text-white font-bold px-8 py-6 h-auto text-base mt-4 transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  Fale com um especialista
                </Button>
              </a>
            </AnimatedElement>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="slide-up" delay={0.3} duration={0.8} threshold={0.2}>
          <div className="bg-white p-4 sm:p-6 md:p-8 rounded-3xl shadow-lg transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] max-w-full">
            {submitted ? (
              <AnimatedElement animation="zoom-in">
                <div className="py-16 text-center">
                  <div className="text-[#4ade80] text-5xl mb-4 animate-bounce">✓</div>
                  <h3 className="text-[#1e3352] text-2xl font-bold mb-2">Formulário enviado!</h3>
                  <p className="text-gray-600">Entraremos em contato em breve.</p>
                </div>
              </AnimatedElement>
            ) : (
              <form className="space-y-4" onSubmit={handleSubmit}>
                <AnimatedElement animation="fade-up" delay={0.5} threshold={0.4}>
                  <div>
                    <label htmlFor="name" className="block text-gray-700 mb-2 text-sm font-medium">
                      Nome/Empresa
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Jane Smith"
                      className="w-full border-0 rounded-md py-3 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 focus:ring-0 transition-all duration-300 focus:bg-gray-50 focus:scale-[1.02]"
                      value={formState.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </AnimatedElement>

                <AnimatedElement animation="fade-up" delay={0.6} threshold={0.4}>
                  <div>
                    <label htmlFor="email" className="block text-gray-700 mb-2 text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="jane@framer.com"
                      className="w-full border-0 rounded-md py-3 px-4 bg-gray-100 text-gray-700 placeholder-gray-400 focus:ring-0 transition-all duration-300 focus:bg-gray-50 focus:scale-[1.02]"
                      value={formState.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </AnimatedElement>

                <AnimatedElement animation="fade-up" delay={0.7} threshold={0.4}>
                  <div>
                    <label htmlFor="category" className="block text-gray-700 mb-2 text-sm font-medium">
                      Categoria
                    </label>
                    <Select onValueChange={(value) => handleSelectChange("category", value)} value={formState.category}>
                      <SelectTrigger className="w-full border-0 rounded-md py-3 px-4 bg-gray-100 text-gray-700 focus:ring-0 transition-all duration-300 hover:bg-gray-50">
                        <SelectValue placeholder="Select..." />
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
                </AnimatedElement>

                <AnimatedElement animation="fade-up" delay={0.8} threshold={0.4}>
                  <div>
                    <label htmlFor="employees" className="block text-gray-700 mb-2 text-sm font-medium">
                      Num. de Funcionários
                    </label>
                    <Select
                      onValueChange={(value) => handleSelectChange("employees", value)}
                      value={formState.employees}
                    >
                      <SelectTrigger className="w-full border-0 rounded-md py-3 px-4 bg-gray-100 text-gray-700 focus:ring-0 transition-all duration-300 hover:bg-gray-50">
                        <SelectValue placeholder="Select..." />
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
                </AnimatedElement>

                <AnimatedElement animation="zoom-in" delay={0.9} threshold={0.4}>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-70 disabled:hover:scale-100 mt-6"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </span>
                    ) : (
                      "Enviar"
                    )}
                  </button>
                </AnimatedElement>
              </form>
            )}
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
