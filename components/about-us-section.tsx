"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Headphones, Shield, LayoutGrid } from "lucide-react"
import AnimatedElement from "./animated-element"

export default function AboutUsSection() {
  return (
    <section className="relative pt-16 pb-20 text-white">
      {/* Fundo azul com curva */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image src="/images/blue-background.jpg" alt="Background" fill className="object-cover" sizes="100vw" />
      </div>

      {/* Conteúdo da seção */}
      <div className="container mx-auto px-4 relative z-10">
        <AnimatedElement animation="fade-up">
          <div className="flex justify-center mb-6">
            <div className="bg-[#c4c4c4]/20 text-white px-6 py-1.5 rounded-full text-sm font-medium">SOBRE NÓS</div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.1}>
          <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-2">Quem somos?</h2>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.2}>
          <p className="text-center text-gray-300 mb-8 max-w-2xl mx-auto">Entenda como surgiu a ON4 Contabilidade</p>
        </AnimatedElement>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <AnimatedElement animation="fade-right" delay={0.3}>
            <div className="space-y-6 text-center md:text-left">
              <p className="text-white leading-relaxed text-lg">
                <span>Na ON4 Contabilidade, </span>
                <span className="font-semibold">
                  acreditamos que a contabilidade deve ser uma aliada estratégica do seu negócio.{" "}
                </span>
                <span>
                  Somos uma empresa moderna e inovadora, especializada em soluções contábeis que facilitam a sua gestão.
                </span>
              </p>

              <p className="text-white leading-relaxed text-lg">
                Nosso nome, "ON4", reflete a força e a sinergia dos quatro sócios que, juntos, oferecem expertise em
                todas as áreas da contabilidade, proporcionando serviços completos, transparentes e acessíveis.
              </p>

              <p className="text-white leading-relaxed text-lg">
                Nosso compromisso é{" "}
                <span className="font-bold">
                  transformar a contabilidade em um diferencial para você, ajudando a tomar decisões seguras e
                  eficientes.{" "}
                </span>
                Com um atendimento próximo e personalizado, utilizamos tecnologia para descomplicar processos,
                garantindo prática, segurança e conformidade fiscal.
              </p>

              <div className="pt-4">
                <a
                  href="https://wa.me/5543988466580?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%0AQuero%20falar%20com%20atendente"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#4ade80] hover:bg-[#3dc76a] text-white font-semibold px-8 py-3 h-auto rounded-md transition-all duration-300 hover:scale-105">
                    Saiba mais
                  </Button>
                </a>
              </div>
            </div>
          </AnimatedElement>

          <AnimatedElement animation="fade-left" delay={0.4}>
            <div className="flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-lg transition-transform duration-500 hover:scale-[1.02]">
                <Image
                  src="/images/on4-logo-wall-new.jpg"
                  alt="Logo ON4 Contabilidade na parede do escritório"
                  width={500}
                  height={350}
                  className="w-full h-auto object-cover"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
              </div>
            </div>
          </AnimatedElement>
        </div>

        <div className="mt-16">
          <AnimatedElement animation="fade-up" delay={0.5}>
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8 text-center max-w-4xl mx-auto">
              A forma mais efetiva de gerenciar sua finanças, agora está na palma da sua mão.
            </h3>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <AnimatedElement animation="fade-up" delay={0.6}>
              <div className="bg-gray-200/10 p-6 rounded-lg transition-all duration-300 hover:bg-gray-200/20 hover:translate-y-[-5px]">
                <div className="text-[#4ade80] mb-4">
                  <Headphones size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">Suporte</h4>
                <p className="text-gray-300 leading-relaxed">
                  Nossa equipe irá te ajudar todos os dias da semana, oferecendo todo o suporte que você necessita.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={0.7}>
              <div className="bg-gray-200/10 p-6 rounded-lg transition-all duration-300 hover:bg-gray-200/20 hover:translate-y-[-5px]">
                <div className="text-[#4ade80] mb-4">
                  <Shield size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">Segurança</h4>
                <p className="text-gray-300 leading-relaxed">
                  Nosso trabalho é totalmente seguro e qualificado, com profissionais altamente capacitados.
                </p>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="fade-up" delay={0.8}>
              <div className="bg-gray-200/10 p-6 rounded-lg transition-all duration-300 hover:bg-gray-200/20 hover:translate-y-[-5px]">
                <div className="text-[#4ade80] mb-4">
                  <LayoutGrid size={32} />
                </div>
                <h4 className="text-xl font-semibold mb-3 text-white">Facilidade</h4>
                <p className="text-gray-300 leading-relaxed">
                  Nosso objetivo é facilitar os processos contábeis da sua empresa, descomplicando o seu dia a dia.
                </p>
              </div>
            </AnimatedElement>
          </div>

          <AnimatedElement animation="fade-up" delay={0.9}>
            <div className="flex justify-center mt-8">
              <a
                href="https://wa.me/5543988466580?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%0AQuero%20falar%20com%20atendente"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-[#4ade80] hover:bg-[#3dc76a] text-white font-semibold px-8 py-3 h-auto rounded-md transition-all duration-300 hover:scale-105">
                  Saiba mais
                </Button>
              </a>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  )
}
