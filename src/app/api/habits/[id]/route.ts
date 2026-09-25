import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  await prisma.habit.deleteMany({
    where: {
      id: params.id,
      userId: session.userId
    }
  })

  return NextResponse.json({ success: true })
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()

  const habit = await prisma.habit.updateMany({
    where: {
      id: params.id,
      userId: session.userId
    },
    data
  })

  return NextResponse.json(habit)
}
