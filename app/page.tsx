import ClientsSection from "@/components/clients-section"
import AboutSection from "@/components/about-section"
import MigrateSection from "@/components/migrate-section"
import HeroSection from "@/components/hero-section"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AboutUsSection from "@/components/about-us-section"
import OurServicesSection from "@/components/our-services-section"
import NewTestimonialsSection from "@/components/new-testimonials-section"
import NewBlogSection from "@/components/new-blog-section"
import ParallaxBackground from "@/components/parallax-background"

export default function Home() {
  return (
    <>
      <div className="relative">
        <ParallaxBackground
          src="/images/header-background.jpg"
          alt="Background"
          overlayColor="rgba(30, 51, 82, 0.5)"
          speed={0.3}
        />
        <div className="relative z-10">
          <Navbar />
          <HeroSection />
        </div>
      </div>
      <ClientsSection />
      <div id="sobre">
        <AboutSection />
      </div>
      <MigrateSection />
      <AboutUsSection />
      <div id="servicos">
        <OurServicesSection />
      </div>
      <div id="depoimentos">
        <NewTestimonialsSection />
      </div>
      <div id="blog">
        <NewBlogSection />
      </div>
      <Footer />
    </>
  )
}
