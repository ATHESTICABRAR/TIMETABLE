'use client'

import { useState, useEffect } from 'react'

export default function StatisticsClient() {
  const [stats, setStats] = useState({ totalCompleted: 0, longestStreak: 0, totalHabits: 0, completionsThisMonth: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      const res = await fetch('/api/stats')
      if (res.ok) {
        setStats(await res.json())
      }
      setLoading(false)
    }
    fetchStats()
  }, [])

  if (loading) return <div className="p-8 text-slate-500">Loading your real statistics...</div>

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Statistics & Analytics</h1>
        <p className="text-slate-500">Track your real consistency over time.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard title="This Month" value={stats.completionsThisMonth.toString()} trend="Current month progress" />
        <StatCard title="Total Tracked Habits" value={stats.totalHabits.toString()} trend="Currently active" />
        <StatCard title="Total Completions" value={stats.totalCompleted.toString()} trend="All time logs 🔥" />
        <StatCard title="Longest Streak" value={`${stats.longestStreak} Days`} trend="Personal best!" />
      </div>
    </div>
  )
}

function StatCard({ title, value, trend }: { title: string, value: string, trend: string }) {
  return (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
      <h3 className="text-sm font-medium text-slate-500 mb-1">{title}</h3>
      <div className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{value}</div>
      <p className="text-sm text-green-500 font-medium">{trend}</p>
    </div>
  )
}
