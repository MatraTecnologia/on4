import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params

    // Simular desbanimento do usuário
    console.log(`Desbanindo usuário ${userId}`)

    return NextResponse.json({
      success: true,
      message: "Usuário desbanido com sucesso",
    })
  } catch (error) {
    console.error("Erro ao desbanir usuário:", error)
    return NextResponse.json({ error: "Erro ao desbanir usuário" }, { status: 500 })
  }
}
