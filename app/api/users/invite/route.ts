import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, role } = await request.json()

    // Simular envio de convite
    console.log(`Convite enviado para ${email} com role ${role}`)

    return NextResponse.json({
      success: true,
      message: `Convite enviado para ${email}`,
    })
  } catch (error) {
    console.error("Erro ao enviar convite:", error)
    return NextResponse.json({ error: "Erro ao enviar convite" }, { status: 500 })
  }
}
