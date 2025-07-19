"use client"

import Image from "next/image"
import AnimatedElement from "./animated-element"

export default function NewTestimonialsSection() {
  const testimonials = [
    {
      name: "Regiane Lozam",
      role: "Contadora",
      image: "/woman-headshot.png",
      text: "Estou muito satisfeita com os serviços prestados pela ON4. Equipe extremamente competente e profissional, demonstram domínio no assunto são ágeis e são extremamente receptivos às minhas perguntas e necessidades, fornecendo respostas claras e soluções eficazes. Sem sombra de dúvidas o melhor escritório de contabilidade de Londrina!",
    },
    {
      name: "Francisco Bruno",
      role: "Empresário",
      image: "/businessman-headshot.png",
      text: "A ON4 atende muito bem nossas necessidades. O principal ponto forte nesse escritório é o atendimento. O Atendimento é o diferencial em cada empresa e a ON4 dá show quando o assunto é esse. Parabéns pessoal, vocês vão crescer muito mais e continuem com esse atendimento sensacional.",
    },
    {
      name: "Daniel Schulze",
      role: "Empresário",
      image: "/executive-man-headshot.png",
      text: "Atendimento espetacular...excelentes profissionais...resolvem todos os problemas e avisa com antecedência tudo o que precisa para realizar as operações.",
    },
  ]

  return (
    <section className="py-16 bg-[#e8eef4]">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="zoom-in" duration={0.8} threshold={0.3}>
          <div className="flex justify-center mb-6">
            <div className="bg-[#1e3352] text-white px-6 py-2 rounded-full text-sm font-medium transition-transform duration-300 hover:scale-105">
              Feedbacks
            </div>
          </div>
        </AnimatedElement>

        <AnimatedElement animation="slide-up" delay={0.1} duration={0.8} threshold={0.3}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e3352] mb-3">
            O que dizem <br />
            nossos clientes
          </h2>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.2} duration={0.8} threshold={0.3}>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Confira os feedbacks de quem já passou pela ON4
          </p>
        </AnimatedElement>

        <AnimatedElement animation="slide-up" delay={0.3} duration={0.8} threshold={0.2}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <AnimatedElement
                key={index}
                animation="slide-up"
                delay={0.4 + index * 0.2}
                duration={0.8}
                threshold={0.3}
              >
                <TestimonialCard {...testimonial} />
              </AnimatedElement>
            ))}
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}

function TestimonialCard({ name, role, image, text }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm h-full flex flex-col transition-all duration-500 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-2">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 rounded-full overflow-hidden mr-3 transition-transform duration-300 hover:scale-110">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            width={48}
            height={48}
            className="w-full h-full object-cover"
            sizes="48px"
          />
        </div>
        <div>
          <h4 className="text-lg font-bold text-[#1e3352] transition-colors duration-300 hover:text-[#4ade80]">
            {name}
          </h4>
          <p className="text-gray-500 text-sm">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 leading-relaxed flex-grow text-sm">{text}</p>
    </div>
  )
}
