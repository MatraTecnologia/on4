import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, FileX } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="mb-8">
            <FileX className="h-24 w-24 text-gray-400 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-[#1e3352] mb-2">Post não encontrado</h1>
            <p className="text-xl text-gray-600">O artigo que você está procurando não existe ou foi removido.</p>
          </div>

          <div className="space-y-4">
            <Link href="/blog">
              <Button className="bg-[#4ade80] hover:bg-[#3dc76a]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Blog
              </Button>
            </Link>

            <div>
              <Link href="/" className="text-[#1e3352] hover:text-[#4ade80] transition-colors">
                Ir para a página inicial
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
