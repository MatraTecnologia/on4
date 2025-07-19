"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Award, Users, TrendingUp, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import AnimatedElement from "./animated-element"
import AnimatedCounter from "./animated-counter"

export default function AboutSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedElement animation="slide-left">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3352] mb-6">Sobre a ON4 Contabilidade</h2>
              <p className="text-gray-600 text-lg mb-6">
                Há mais de 15 anos no mercado, a ON4 Contabilidade é referência em soluções contábeis completas e
                personalizadas em Londrina e região. Nossa missão é simplificar a gestão contábil das empresas,
                oferecendo serviços de alta qualidade com tecnologia de ponta.
              </p>
              <p className="text-gray-600 text-lg mb-8">
                Trabalhamos com empresas de todos os portes, desde MEIs até grandes corporações, sempre com foco na
                excelência do atendimento e na satisfação dos nossos clientes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/saiba-mais">
                  <Button className="bg-[#4ade80] hover:bg-[#3dc76a] text-white font-bold px-6 py-3">
                    Saiba Mais
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <a
                  href="https://wa.me/554333240380?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%0AQuero%20falar%20com%20atendente"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="border-[#1e3352] text-[#1e3352] hover:bg-[#1e3352] hover:text-white px-6 py-3 bg-transparent"
                  >
                    Fale Conosco
                  </Button>
                </a>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="slide-right">
            <div className="relative">
              <Image
                src="/images/team-meeting.jpg"
                alt="Equipe ON4 Contabilidade"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#4ade80] text-white p-4 rounded-lg shadow-lg">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm">Anos de Experiência</div>
              </div>
            </div>
          </AnimatedElement>
        </div>

        {/* Estatísticas */}
        <AnimatedElement animation="fade-up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#4ade80] mb-2">
                <AnimatedCounter end={500} duration={2000} />+
              </div>
              <div className="text-gray-600">Clientes Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#4ade80] mb-2">
                <AnimatedCounter end={15} duration={2000} />+
              </div>
              <div className="text-gray-600">Anos de Experiência</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#4ade80] mb-2">
                <AnimatedCounter end={98} duration={2000} />%
              </div>
              <div className="text-gray-600">Satisfação dos Clientes</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#4ade80] mb-2">
                <AnimatedCounter end={24} duration={2000} />
                /7
              </div>
              <div className="text-gray-600">Suporte Online</div>
            </div>
          </div>
        </AnimatedElement>

        {/* Nossos Diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Users className="w-8 h-8 text-[#4ade80]" />,
              title: "Equipe Especializada",
              description: "Profissionais qualificados e atualizados com as melhores práticas do mercado",
            },
            {
              icon: <Award className="w-8 h-8 text-[#4ade80]" />,
              title: "Qualidade Certificada",
              description: "Processos certificados e auditados para garantir a excelência dos serviços",
            },
            {
              icon: <TrendingUp className="w-8 h-8 text-[#4ade80]" />,
              title: "Crescimento Sustentável",
              description: "Ajudamos sua empresa a crescer de forma organizada e sustentável",
            },
            {
              icon: <Shield className="w-8 h-8 text-[#4ade80]" />,
              title: "Segurança Total",
              description: "Seus dados protegidos com os mais altos padrões de segurança e confidencialidade",
            },
          ].map((item, index) => (
            <AnimatedElement key={index} animation="zoom-in" delay={index * 0.1}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-[#1e3352] mb-3">{item.title}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                </CardContent>
              </Card>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  )
}
