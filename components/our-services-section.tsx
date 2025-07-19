"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import AnimatedElement from "./animated-element"

export default function OurServicesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="slide-up" duration={0.8} threshold={0.2}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e3352] mb-4">Nossos Serviços</h2>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.1} duration={0.8} threshold={0.3}>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Mantenha-se atualizado com dicas e insights sobre contabilidade, gestão financeira e tributação. Acompanhe
            nossas publicações para otimizar sua gestão e tomar decisões mais seguras
          </p>
        </AnimatedElement>

        <AnimatedElement animation="slide-up" delay={0.2} duration={0.8} threshold={0.2}>
          <div className="bg-gray-100/50 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:shadow-lg">
            <div className="grid grid-cols-12 gap-6">
              {/* Card 1: Contabilidade Geral */}
              <AnimatedElement animation="slide-up" delay={0.3} threshold={0.3} className="col-span-12 md:col-span-6">
                <div className="bg-transparent rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-105 hover:-translate-y-2">
                  <Image
                    src="/images/contabilidade-geral-card.png"
                    alt="Contabilidade Geral - Cuidamos de toda a rotina contábil da sua empresa"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </AnimatedElement>

              {/* Card 2: Gestão Fiscal e Tributária */}
              <AnimatedElement
                animation="slide-up"
                delay={0.4}
                threshold={0.3}
                className="col-span-12 md:col-span-6 row-span-2"
              >
                <div className="bg-gray-200/50 rounded-xl p-6 flex flex-col h-full transition-all duration-500 hover:shadow-xl hover:bg-gray-200/80 hover:scale-[1.02]">
                  <div className="flex-1 transition-transform duration-700 hover:scale-[1.02]">
                    <Image
                      src="/images/fiscal-management.jpg"
                      alt="Gestão Fiscal e Tributária"
                      width={600}
                      height={600}
                      className="w-full rounded-xl transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </div>
              </AnimatedElement>

              {/* Card 3: Consultoria Financeira */}
              <AnimatedElement animation="slide-up" delay={0.5} threshold={0.3} className="col-span-12 md:col-span-6">
                <div className="bg-transparent rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-105 hover:-translate-y-2">
                  <Image
                    src="/images/consultoria-financeira-card.png"
                    alt="Consultoria Financeira e Planejamento Tributário"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </AnimatedElement>

              {/* Card 4: Folha de Pagamento */}
              <AnimatedElement animation="slide-up" delay={0.6} threshold={0.3} className="col-span-12 md:col-span-6">
                <div className="bg-transparent rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-105 hover:-translate-y-2">
                  <Image
                    src="/images/folha-pagamento-card.png"
                    alt="Folha de Pagamento e Departamento Pessoal"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </AnimatedElement>

              {/* Card 5: Abertura de Empresas */}
              <AnimatedElement animation="slide-up" delay={0.7} threshold={0.3} className="col-span-12 md:col-span-6">
                <div className="bg-transparent rounded-xl overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-105 hover:-translate-y-2">
                  <Image
                    src="/images/abertura-empresas-card.png"
                    alt="Abertura e Regularização de empresas"
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-700 hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </AnimatedElement>
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="zoom-in" delay={0.8} threshold={0.4}>
          <div className="flex justify-center mt-8">
            <Button className="bg-[#4ade80] hover:bg-[#3dc76a] text-white font-medium px-12 py-3 h-auto rounded-md transition-all duration-300 hover:scale-105 hover:shadow-lg">
              Saiba mais
            </Button>
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
