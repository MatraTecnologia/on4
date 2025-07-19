import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#1e3352] text-white py-16 rounded-t-lg">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Nos sigas em nossas redes sociais!</h3>
          <div className="flex space-x-4">
            <Link
              href="https://youtube.com"
              className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-youtube"
              >
                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                <path d="m10 15 5-3-5-3z" />
              </svg>
            </Link>
            <Link
              href="https://facebook.com"
              className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-facebook"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link
              href="https://instagram.com"
              className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </Link>
            <Link
              href="https://linkedin.com"
              className="bg-gray-600 w-10 h-10 rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-linkedin"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </Link>
          </div>
        </div>

        <div>
          <nav className="flex flex-col space-y-3">
            <Link href="/quem-somos" className="hover:text-[#e6c88a] transition-colors">
              Quem somos
            </Link>
            <Link href="/clientes" className="hover:text-[#e6c88a] transition-colors">
              Clientes
            </Link>
            <Link href="/suporte" className="hover:text-[#e6c88a] transition-colors">
              Suporte
            </Link>
            <Link href="/contato" className="hover:text-[#e6c88a] transition-colors">
              Contato
            </Link>
            <Link href="/servicos" className="hover:text-[#e6c88a] transition-colors">
              Serviços
            </Link>
            <Link href="/blog" className="hover:text-[#e6c88a] transition-colors">
              Blog
            </Link>
          </nav>
        </div>

        <div className="space-y-3">
          <p>Rua Piauí, 399, Salas 1201/1206.</p>
          <p>Centro. Londrina/PR. CEP 86.010-420</p>
          <p>On4 Contabilidade - Londrina/PR</p>
          <p>(43) 3324-0380 - Fixo e WhatsApp</p>
          <p>(43) 98846-6580 - WhatsApp</p>
          <p>e-mail: contato@on4.com.br</p>
        </div>
      </div>
    </footer>
  )
}
