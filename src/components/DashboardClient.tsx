'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Check, Plus, PlusCircle, Trash2 } from 'lucide-react'
import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs))
}

type Habit = {
  id: string
  name: string
  icon: string
  description?: string
  frequency: string
  target?: string
  logs: { date: string, completed: boolean }[]
}

const motivationMessages = [
  "Keep going! 💪",
  "You're building consistency.",
  "One day at a time.",
  "Don't break the streak 🔥",
  "Great progress so far!",
  "Discipline equals freedom."
]

export default function DashboardClient({ userName }: { userName: string }) {
  const [habits, setHabits] = useState<Habit[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddModal, setShowAddModal] = useState(false)
  const [motivation, setMotivation] = useState(motivationMessages[0])

  const todayStr = format(new Date(), 'yyyy-MM-dd')

  const fetchHabits = async () => {
    const res = await fetch(`/api/habits?date=${todayStr}`)
    if (res.ok) {
      const data = await res.json()
      setHabits(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchHabits()
    setMotivation(motivationMessages[Math.floor(Math.random() * motivationMessages.length)])
  }, [])

  const toggleHabit = async (habitId: string, currentStatus: boolean) => {
    // Optimistic update
    setHabits(prev => prev.map(h => {
      if (h.id === habitId) {
        const hasLog = h.logs.find(l => l.date === todayStr)
        return {
          ...h,
          logs: hasLog 
            ? h.logs.map(l => l.date === todayStr ? { ...l, completed: !currentStatus } : l)
            : [...h.logs, { date: todayStr, completed: !currentStatus }]
        }
      }
      return h
    }))

    await fetch('/api/habits/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habitId, date: todayStr, completed: !currentStatus })
    })
  }
  
  const deleteHabit = async (habitId: string) => {
    if (!confirm('Delete this habit?')) return
    await fetch(`/api/habits/${habitId}`, { method: 'DELETE' })
    fetchHabits()
  }

  const completedCount = habits.filter(h => h.logs.find(l => l.date === todayStr)?.completed).length
  const totalCount = habits.length
  const progressPercent = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100)

  return (
    <div className="space-y-8 pb-20 md:pb-0">
      <header className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Good Morning, {userName} 👋</h1>
        <p className="text-slate-500 dark:text-slate-400">{motivation}</p>
      </header>

      {/* Progress Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-100 dark:border-slate-700">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-lg font-semibold">Today's Progress</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Completed: <span className="font-medium text-slate-900 dark:text-white">{completedCount} / {totalCount}</span> habits
            </p>
          </div>
          <div className="text-2xl font-bold text-primary">{progressPercent}%</div>
        </div>
        <div className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Habits List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Your Habits</h2>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 text-sm font-medium text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20 px-3 py-1.5 rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Habit
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Loading habits...</div>
        ) : habits.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500 mb-4">No habits yet. Start tracking today!</p>
            <button 
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Create First Habit
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {habits.map(habit => {
              const isCompleted = habit.logs.find(l => l.date === todayStr)?.completed ?? false
              return (
                <div 
                  key={habit.id}
                  className={cn(
                    "group flex items-center justify-between p-4 rounded-xl border transition-all duration-200 cursor-pointer",
                    isCompleted 
                      ? "bg-blue-50/50 border-blue-200 dark:bg-blue-900/10 dark:border-blue-900/30" 
                      : "bg-white border-slate-200 hover:border-slate-300 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600"
                  )}
                  onClick={() => toggleHabit(habit.id, isCompleted)}
                >
                  <div className="flex items-center gap-4">
                    <button 
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors",
                        isCompleted 
                          ? "bg-primary border-primary text-white" 
                          : "border-slate-300 dark:border-slate-600 text-transparent hover:border-primary"
                      )}
                    >
                      <Check className="w-5 h-5" />
                    </button>
                    <div>
                      <h3 className={cn(
                        "font-semibold text-lg flex items-center gap-2",
                        isCompleted ? "text-slate-500 dark:text-slate-400 line-through" : "text-slate-900 dark:text-white"
                      )}>
                        <span>{habit.icon}</span>
                        {habit.name} {habit.target ? `— ${habit.target}` : ''}
                      </h3>
                      {habit.description && (
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                          {habit.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <button 
                    onClick={(e) => { e.stopPropagation(); deleteHabit(habit.id) }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {showAddModal && (
        <AddHabitModal 
          onClose={() => setShowAddModal(false)} 
          onAdd={() => { setShowAddModal(false); fetchHabits() }} 
        />
      )}
    </div>
  )
}

function AddHabitModal({ onClose, onAdd }: { onClose: () => void, onAdd: () => void }) {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState('📝')
  const [description, setDescription] = useState('')
  const [target, setTarget] = useState('')
  const [frequency, setFrequency] = useState('daily')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await fetch('/api/habits', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, icon, description, target, frequency })
    })
    onAdd()
  }

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
          <h2 className="text-lg font-bold">Add New Habit</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="flex gap-4">
            <div className="w-16">
              <label className="block text-sm font-medium mb-1">Icon</label>
              <input required type="text" className="w-full p-2 text-center text-xl rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" value={icon} onChange={e => setIcon(e.target.value)} />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium mb-1">Habit Name</label>
              <input required type="text" placeholder="e.g. Read a Book" className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" value={name} onChange={e => setName(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Target (Optional)</label>
            <input type="text" placeholder="e.g. 30 minutes, 20 pages" className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" value={target} onChange={e => setTarget(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description (Optional)</label>
            <input type="text" placeholder="e.g. Self-improvement reading" className="w-full p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-transparent" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          
          <div className="pt-4 flex gap-3">
            <button type="button" onClick={onClose} className="flex-1 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex-1 py-2 bg-primary text-white font-medium rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : 'Save Habit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
