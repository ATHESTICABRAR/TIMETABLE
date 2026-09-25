'use client'

import { useState, useEffect } from 'react'
import { format, subDays, addDays, isFuture } from 'date-fns'
import { ChevronLeft, ChevronRight, Check, X } from 'lucide-react'
import { clsx } from 'clsx'

type Habit = {
  id: string
  name: string
  icon: string
  logs: { date: string, completed: boolean }[]
}

export default function CalendarClient() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)

  const dateStr = format(currentDate, 'yyyy-MM-dd')
  const displayDate = format(currentDate, 'MMMM d, yyyy')

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      const res = await fetch(`/api/habits?date=${dateStr}`)
      if (res.ok) {
        setHabits(await res.json())
      }
      setLoading(false)
    }
    fetchHistory()
  }, [dateStr])

  const goBack = () => setCurrentDate(prev => subDays(prev, 1))
  const goForward = () => {
    if (!isFuture(addDays(currentDate, 1))) {
      setCurrentDate(prev => addDays(prev, 1))
    }
  }

  const completedCount = habits.filter(h => h.logs.find(l => l.date === dateStr)?.completed).length
  const totalCount = habits.length
  const percent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">History & Calendar</h1>
        <p className="text-slate-500">View your past performance</p>
      </header>

      <div className="flex items-center justify-between bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
        <button onClick={goBack} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="text-center">
          <h2 className="text-xl font-bold">{displayDate}</h2>
          <p className="text-sm text-slate-500 font-medium">Daily Completion: {percent}%</p>
        </div>
        <button 
          onClick={goForward} 
          disabled={isFuture(addDays(currentDate, 1))}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full disabled:opacity-30"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm space-y-4">
        {loading ? (
          <div className="text-center text-slate-500 py-8">Loading...</div>
        ) : habits.length === 0 ? (
          <div className="text-center text-slate-500 py-8">No habits tracked for this day.</div>
        ) : (
          habits.map(habit => {
            const isCompleted = habit.logs.find(l => l.date === dateStr)?.completed ?? false
            return (
              <div key={habit.id} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <div className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center text-white",
                  isCompleted ? "bg-green-500" : "bg-red-500"
                )}>
                  {isCompleted ? <Check className="w-5 h-5" /> : <X className="w-5 h-5" />}
                </div>
                <div className="font-medium flex items-center gap-2">
                  <span>{habit.icon}</span>
                  {habit.name}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
