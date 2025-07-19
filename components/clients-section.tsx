import Image from "next/image"
import AnimatedElement from "./animated-element"

export default function ClientsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedElement animation="slide-up" duration={0.8} threshold={0.3}>
          <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e3352] mb-12">
            Conheça alguns de nossos clientes
          </h2>
        </AnimatedElement>

        <AnimatedElement animation="fade-up" delay={0.3} duration={0.8} threshold={0.3}>
          <div className="flex justify-center">
            <Image
              src="/images/clients-logos.png"
              alt="Nossos clientes: Farmácia Super Popular, THE BEST açaí, entressafra e BONI"
              width={700}
              height={80}
              className="w-full max-w-4xl h-auto transition-transform duration-500 hover:scale-105"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
        </AnimatedElement>
      </div>
    </section>
  )
}
