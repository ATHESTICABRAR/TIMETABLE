'use client'

import { useState, useEffect } from 'react'

export default function StatisticsClient() {
  const [stats, setStats] = useState({ daily: 0, weekly: 0, monthly: 0, totalCompleted: 0, longestStreak: 0 })

  useEffect(() => {
    // In a real app, this would fetch aggregated data from an API route.
    // For this demo, we'll simulate the response.
    setTimeout(() => {
      setStats({
        daily: 75,
        weekly: 68,
        monthly: 72,
        totalCompleted: 142,
        longestStreak: 12
      })
    }, 500)
  }, [])

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Statistics & Analytics</h1>
        <p className="text-slate-500">Track your consistency over time.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard title="Daily Completion" value={`${stats.daily}%`} trend="+5% this week" />
        <StatCard title="Weekly Completion" value={`${stats.weekly}%`} trend="-2% last week" />
        <StatCard title="Total Habits Completed" value={stats.totalCompleted.toString()} trend="Keep it up!" />
        <StatCard title="Longest Streak" value={`${stats.longestStreak} Days`} trend="Personal best 🔥" />
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
