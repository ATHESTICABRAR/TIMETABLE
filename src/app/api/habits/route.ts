import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const url = new URL(req.url)
  const date = url.searchParams.get('date')

  const habits = await prisma.habit.findMany({
    where: { userId: session.userId },
    include: {
      logs: date ? { where: { date } } : true,
    }
  })

  return NextResponse.json(habits)
}

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const data = await req.json()
  
  const habit = await prisma.habit.create({
    data: {
      ...data,
      userId: session.userId,
    }
  })

  return NextResponse.json(habit)
}
