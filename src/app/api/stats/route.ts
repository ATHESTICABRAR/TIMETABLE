import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getSession } from '@/lib/auth'

export async function GET() {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const habits = await prisma.habit.findMany({
    where: { userId: session.userId },
    include: { logs: true }
  })

  let totalCompleted = 0
  let longestStreak = 0
  let completionsThisMonth = 0

  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  habits.forEach(habit => {
    // Count total completed
    const completedLogs = habit.logs.filter(l => l.completed)
    totalCompleted += completedLogs.length
    
    // Count this month
    completedLogs.forEach(l => {
      const logDate = new Date(l.date)
      if (logDate.getMonth() === currentMonth && logDate.getFullYear() === currentYear) {
        completionsThisMonth++
      }
    })

    // Calculate longest streak for this habit (simplified based on continuous dates)
    let currentStreak = 0
    let maxStreak = 0
    
    // Sort dates chronological
    const sortedDates = completedLogs.map(l => new Date(l.date).getTime()).sort((a, b) => a - b)
    
    for (let i = 0; i < sortedDates.length; i++) {
      if (i === 0) {
        currentStreak = 1
      } else {
        const diffInDays = (sortedDates[i] - sortedDates[i-1]) / (1000 * 60 * 60 * 24)
        if (diffInDays === 1) {
          currentStreak++
        } else if (diffInDays > 1) {
          currentStreak = 1
        }
      }
      if (currentStreak > maxStreak) maxStreak = currentStreak
    }

    if (maxStreak > longestStreak) {
      longestStreak = maxStreak
    }
  })

  return NextResponse.json({
    totalCompleted,
    longestStreak,
    totalHabits: habits.length,
    completionsThisMonth
  })
}
