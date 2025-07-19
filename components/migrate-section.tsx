"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, CheckCircle, Clock, Shield, Users } from "lucide-react"
import Link from "next/link"
import AnimatedElement from "./animated-element"

export default function MigrateSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-[#f8fafc] to-[#e2e8f0]">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1e3352] mb-4">Migre sua Contabilidade para a ON4</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Processo simples, rápido e sem complicações. Cuidamos de tudo para você!
            </p>
          </div>
        </AnimatedElement>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <AnimatedElement animation="slide-left">
            <div>
              <h3 className="text-2xl font-bold text-[#1e3352] mb-6">Por que migrar para a ON4?</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: <Users className="w-6 h-6 text-[#4ade80]" />,
                    title: "Atendimento Personalizado",
                    description: "Cada cliente tem um contador dedicado que conhece profundamente seu negócio",
                  },
                  {
                    icon: <Clock className="w-6 h-6 text-[#4ade80]" />,
                    title: "Agilidade nos Processos",
                    description: "Tecnologia de ponta para entregar resultados mais rápidos e precisos",
                  },
                  {
                    icon: <Shield className="w-6 h-6 text-[#4ade80]" />,
                    title: "Segurança Total",
                    description: "Seus dados protegidos com os mais altos padrões de segurança",
                  },
                  {
                    icon: <CheckCircle className="w-6 h-6 text-[#4ade80]" />,
                    title: "Compliance Garantido",
                    description: "Sempre em dia com todas as obrigações fiscais e trabalhistas",
                  },
                ].map((item, index) => (
                  <AnimatedElement key={index} animation="fade-up" delay={index * 0.1}>
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-[#1e3352] mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  </AnimatedElement>
                ))}
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide-right">
            <Card className="bg-white shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-[#1e3352] mb-6 text-center">Processo de Migração</h3>
                <div className="space-y-6">
                  {[
                    {
                      step: "1",
                      title: "Análise Inicial",
                      description: "Avaliamos sua situação atual e identificamos oportunidades de melhoria",
                    },
                    {
                      step: "2",
                      title: "Planejamento",
                      description: "Criamos um plano personalizado para a transição da sua contabilidade",
                    },
                    {
                      step: "3",
                      title: "Migração",
                      description: "Cuidamos de toda a transferência de dados e documentos",
                    },
                    {
                      step: "4",
                      title: "Acompanhamento",
                      description: "Suporte completo durante todo o processo de adaptação",
                    },
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-[#4ade80] text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#1e3352] mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedElement>
        </div>

        <AnimatedElement animation="zoom-in">
          <div className="text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-[#1e3352] mb-4">Migração 100% Gratuita</h3>
              <p className="text-gray-600 mb-6">
                Não cobramos nada pela migração da sua contabilidade. Nossa equipe cuida de todo o processo sem custo
                adicional.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5543988466580?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%0AQuero%20migrar%20minha%20contabilidade"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#4ade80] hover:bg-[#3dc76a] text-white font-bold px-8 py-6 h-auto text-lg">
                    Iniciar Migração
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link href="/saiba-mais">
                  <Button
                    variant="outline"
                    className="border-[#1e3352] text-[#1e3352] hover:bg-[#1e3352] hover:text-white px-8 py-6 h-auto text-lg bg-transparent"
                  >
                    Saiba Mais
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
