import { NextResponse } from "next/server"

export async function POST(request: Request, { params }: { params: { userId: string } }) {
  try {
    const { userId } = params

    // Simular banimento do usuário
    console.log(`Banindo usuário ${userId}`)

    return NextResponse.json({
      success: true,
      message: "Usuário banido com sucesso",
    })
  } catch (error) {
    console.error("Erro ao banir usuário:", error)
    return NextResponse.json({ error: "Erro ao banir usuário" }, { status: 500 })
  }
}
