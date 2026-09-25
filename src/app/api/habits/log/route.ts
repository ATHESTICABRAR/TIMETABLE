import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function POST(req: Request) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { habitId, date, completed } = await req.json()

  // Verify ownership
  const habit = await prisma.habit.findUnique({ where: { id: habitId } })
  if (!habit || habit.userId !== session.userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const log = await prisma.habitLog.upsert({
    where: {
      habitId_date: {
        habitId,
        date
      }
    },
    update: { completed },
    create: {
      habitId,
      date,
      completed
    }
  })

  return NextResponse.json(log)
}
