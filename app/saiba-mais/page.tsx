import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Users, Award, Clock, Shield, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedElement from "@/components/animated-element"

export default function SaibaMaisPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#1e3352] to-[#2a4a6b] text-white py-20 mt-16">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fade-up">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Conheça a <span className="text-[#e6c88a]">ON4 Contabilidade</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Mais de 15 anos transformando a gestão contábil de empresas em Londrina e região
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/5543988466580?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%0AQuero%20falar%20com%20atendente"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-[#4ade80] hover:bg-[#3dc76a] text-white font-bold px-8 py-6 h-auto text-lg">
                    Fale Conosco Agora
                  </Button>
                </a>
                <Link href="/#servicos">
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#1e3352] px-8 py-6 h-auto text-lg bg-transparent"
                  >
                    Ver Nossos Serviços
                  </Button>
                </Link>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedElement animation="slide-left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3352] mb-6">Nossa História</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Fundada em 2008, a ON4 Contabilidade nasceu com o propósito de revolucionar a prestação de serviços
                  contábeis em Londrina. Começamos como um pequeno escritório com grandes sonhos e hoje somos referência
                  em soluções contábeis completas e personalizadas.
                </p>
                <p className="text-gray-600 text-lg mb-6">
                  Nossa trajetória é marcada pela constante busca por excelência, inovação tecnológica e relacionamento
                  próximo com nossos clientes. Ao longo dos anos, crescemos junto com nossos parceiros, sempre mantendo
                  nossos valores de transparência, confiabilidade e comprometimento.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#4ade80] mb-2">15+</div>
                    <div className="text-gray-600">Anos de Experiência</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#4ade80] mb-2">500+</div>
                    <div className="text-gray-600">Clientes Atendidos</div>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-right">
              <div className="relative">
                <Image
                  src="/images/on4-logo-wall-new.jpg"
                  alt="Escritório ON4 Contabilidade"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Nossos Diferenciais */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3352] mb-4">Nossos Diferenciais</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">O que nos torna únicos no mercado contábil</p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="w-8 h-8 text-[#4ade80]" />,
                title: "Atendimento Personalizado",
                description:
                  "Cada cliente recebe atenção dedicada com soluções sob medida para suas necessidades específicas.",
              },
              {
                icon: <Clock className="w-8 h-8 text-[#4ade80]" />,
                title: "Agilidade nos Processos",
                description:
                  "Utilizamos tecnologia de ponta para garantir rapidez e eficiência em todos os nossos serviços.",
              },
              {
                icon: <Shield className="w-8 h-8 text-[#4ade80]" />,
                title: "Segurança Total",
                description: "Seus dados estão protegidos com os mais altos padrões de segurança e confidencialidade.",
              },
              {
                icon: <Award className="w-8 h-8 text-[#4ade80]" />,
                title: "Expertise Comprovada",
                description:
                  "Equipe altamente qualificada com certificações e especializações nas principais áreas contábeis.",
              },
              {
                icon: <TrendingUp className="w-8 h-8 text-[#4ade80]" />,
                title: "Consultoria Estratégica",
                description:
                  "Não apenas cuidamos da contabilidade, mas ajudamos seu negócio a crescer com orientações estratégicas.",
              },
              {
                icon: <CheckCircle className="w-8 h-8 text-[#4ade80]" />,
                title: "Compliance Garantido",
                description:
                  "Mantemos sua empresa sempre em conformidade com todas as obrigações fiscais e trabalhistas.",
              },
            ].map((diferencial, index) => (
              <AnimatedElement key={index} animation="zoom-in" delay={index * 0.1}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="mb-4">{diferencial.icon}</div>
                    <h3 className="text-xl font-semibold text-[#1e3352] mb-3">{diferencial.title}</h3>
                    <p className="text-gray-600">{diferencial.description}</p>
                  </CardContent>
                </Card>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Nossa Equipe */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e3352] mb-4">Nossa Equipe</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Profissionais especializados e comprometidos com o seu sucesso
              </p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatedElement animation="slide-up" delay={0.1}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#1e3352] to-[#4ade80] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1e3352] mb-2">Contadores Especialistas</h3>
                  <p className="text-gray-600">CRCs ativos com especializações em diferentes segmentos empresariais</p>
                </CardContent>
              </Card>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={0.2}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#1e3352] to-[#4ade80] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1e3352] mb-2">Consultores Financeiros</h3>
                  <p className="text-gray-600">Especialistas em planejamento financeiro e análise de investimentos</p>
                </CardContent>
              </Card>
            </AnimatedElement>

            <AnimatedElement animation="slide-up" delay={0.3}>
              <Card className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-[#1e3352] to-[#4ade80] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <Shield className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#1e3352] mb-2">Especialistas Fiscais</h3>
                  <p className="text-gray-600">Profissionais atualizados com as constantes mudanças na legislação</p>
                </CardContent>
              </Card>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Nossos Valores */}
      <section className="py-16 bg-gradient-to-br from-[#1e3352] to-[#2a4a6b] text-white">
        <div className="container mx-auto px-4">
          <AnimatedElement animation="fade-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossos Valores</h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">Os princípios que guiam nossa atuação diária</p>
            </div>
          </AnimatedElement>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Transparência",
                description: "Comunicação clara e honesta em todos os processos",
              },
              {
                title: "Excelência",
                description: "Busca constante pela qualidade superior em nossos serviços",
              },
              {
                title: "Inovação",
                description: "Sempre atualizados com as melhores práticas e tecnologias",
              },
              {
                title: "Compromisso",
                description: "Dedicação total ao sucesso e crescimento dos nossos clientes",
              },
            ].map((valor, index) => (
              <AnimatedElement key={index} animation="zoom-in" delay={index * 0.1}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#4ade80] rounded-full mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{valor.title}</h3>
                  <p className="text-gray-300">{valor.description}</p>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Localização */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedElement animation="slide-left">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#1e3352] mb-6">Nossa Localização</h2>
                <p className="text-gray-600 text-lg mb-6">
                  Estamos estrategicamente localizados no centro de Londrina, facilitando o acesso para nossos clientes
                  de toda a região.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#4ade80] rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e3352]">Endereço:</p>
                      <p className="text-gray-600">
                        Rua Piauí, 399, Salas 1201/1206
                        <br />
                        Centro, Londrina/PR - CEP 86.010-420
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#4ade80] rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e3352]">Telefones:</p>
                      <p className="text-gray-600">
                        (43) 3324-0380 - Fixo e WhatsApp
                        <br />
                        (43) 98846-6580 - WhatsApp
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-[#4ade80] rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#1e3352]">E-mail:</p>
                      <p className="text-gray-600">contato@on4.com.br</p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            <AnimatedElement animation="slide-right">
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold text-[#1e3352] mb-4">Horário de Atendimento</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Segunda a Sexta:</span>
                    <span className="text-[#4ade80] font-semibold">8h às 18h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Sábado:</span>
                    <span className="text-[#4ade80] font-semibold">8h às 12h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">Domingo:</span>
                    <span className="text-gray-500">Fechado</span>
                  </div>
                </div>
                <div className="mt-6">
                  <a
                    href="https://wa.me/5543988466580?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%0AQuero%20falar%20com%20atendente"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-[#4ade80] hover:bg-[#3dc76a] text-white font-bold px-6 py-3">
                      Agendar Visita
                    </Button>
                  </a>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-gradient-to-r from-[#4ade80] to-[#3dc76a] text-white">
        <div className="container mx-auto px-4 text-center">
          <AnimatedElement animation="zoom-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Transformar sua Contabilidade?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Entre em contato conosco hoje mesmo e descubra como podemos ajudar sua empresa a crescer com segurança e
              eficiência.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/5543988466580?text=Ol%C3%A1%2C%20estou%20vindo%20do%20site%0AQuero%20falar%20com%20atendente"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-white text-[#4ade80] hover:bg-gray-100 font-bold px-8 py-6 h-auto text-lg">
                  Falar com Especialista
                </Button>
              </a>
              <Link href="/#servicos">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-[#4ade80] px-8 py-6 h-auto text-lg bg-transparent"
                >
                  Ver Nossos Serviços
                </Button>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>

      <Footer />
    </>
  )
}
