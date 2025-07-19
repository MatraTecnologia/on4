import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="text-[#1e3352] text-3xl font-bold">
              <span className="text-[#1e3352]">ON</span>
              <span className="text-[#4ade80]">4</span>
            </div>
            <div className="text-[#1e3352] text-xs ml-1 mt-auto mb-1 tracking-wider">CONTABILIDADE</div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Criar conta</h1>
          <p className="text-gray-600 mt-2">Registre-se para acessar o dashboard administrativo</p>
        </div>

        <SignUp
          appearance={{
            elements: {
              formButtonPrimary: "bg-[#4ade80] hover:bg-[#3dc76a] text-white",
              card: "shadow-lg",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
            },
          }}
        />
      </div>
    </div>
  )
}
