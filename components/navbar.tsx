"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 100,
        behavior: "smooth",
      })
    }
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`z-50 fixed w-full transition-all duration-300 ${
        isScrolled ? "bg-[#1e3352]/90 backdrop-blur-sm py-2 shadow-md" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <div className="text-[#e6c88a] text-3xl font-bold">
            <span className="text-[#e6c88a]">ON</span>
            <span className="text-[#e6c88a]">4</span>
          </div>
          <div className="text-[#e6c88a] text-xs ml-1 mt-auto mb-1 tracking-wider">CONTABILIDADE</div>
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("sobre")}
            className="text-white hover:text-[#e6c88a] transition-colors text-sm"
          >
            Sobre a ON4
          </button>
          <button
            onClick={() => scrollToSection("servicos")}
            className="text-white hover:text-[#e6c88a] transition-colors text-sm"
          >
            Serviços
          </button>
          <button
            onClick={() => scrollToSection("depoimentos")}
            className="text-white hover:text-[#e6c88a] transition-colors text-sm"
          >
            Depoimentos
          </button>
          <Link href="/blog" className="text-white hover:text-[#e6c88a] transition-colors text-sm">
            Blog
          </Link>

          <SignedOut>
            <SignInButton mode="modal">
              <Button className="bg-[#B69067] text-white hover:bg-[#A58057] font-medium px-6 transition-transform duration-300 hover:scale-105">
                Area do administrador
              </Button>
            </SignInButton>
          </SignedOut>
          <Link href="https://vip.acessorias.com/on4contabilidade">
          <Button className="bg-[#B69067] text-white hover:bg-[#A58057] font-medium px-6 transition-transform duration-300 hover:scale-105">
               Area do cliente
              </Button>
              </Link>
          <SignedIn>
            <Link href="/dashboard">
              <Button className="bg-[#4ade80] text-white hover:bg-[#3dc76a] font-medium px-6 transition-transform duration-300 hover:scale-105">
                Dashboard
              </Button>
            </Link>
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </SignedIn>
        </nav>

        <div className="md:hidden">
          <Button variant="ghost" className="text-white p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu size={24} />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#1e3352]/95 backdrop-blur-sm py-4 px-4 shadow-md">
          <div className="flex justify-end mb-2">
            <button onClick={() => setMobileMenuOpen(false)} aria-label="Fechar menu" className="text-white text-2xl p-2">
              &times;
            </button>
          </div>
          <nav className="flex flex-col space-y-4">
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-white hover:text-[#e6c88a] transition-colors text-sm py-2"
            >
              Sobre a ON4
            </button>
            <button
              onClick={() => scrollToSection("servicos")}
              className="text-white hover:text-[#e6c88a] transition-colors text-sm py-2"
            >
              Serviços
            </button>
            <button
              onClick={() => scrollToSection("depoimentos")}
              className="text-white hover:text-[#e6c88a] transition-colors text-sm py-2"
            >
              Depoimentos
            </button>
            <Link
              href="/blog"
              className="text-white hover:text-[#e6c88a] transition-colors text-sm py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>

            <SignedOut>
              <SignInButton mode="modal">
                <Button className="bg-[#B69067] text-white hover:bg-[#A58057] font-medium w-full">
                  Area do administrador
                </Button>
              </SignInButton>
            </SignedOut>
            <Link href="https://vip.acessorias.com/on4contabilidade" onClick={() => setMobileMenuOpen(false)}>
              <Button className="bg-[#B69067] text-white hover:bg-[#A58057] font-medium px-6 transition-transform duration-300 hover:scale-105">
                Area do cliente
              </Button>
            </Link>
            <SignedIn>
              <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button className="bg-[#4ade80] text-white hover:bg-[#3dc76a] font-medium w-full">Dashboard</Button>
              </Link>
            </SignedIn>
          </nav>
        </div>
      )}
    </header>
  )
}
