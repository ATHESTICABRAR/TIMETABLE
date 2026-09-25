import Shell from '@/components/Shell'
import { Flame } from 'lucide-react'

export default function StreaksPage() {
  return (
    <Shell>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Streaks 🔥</h1>
          <p className="text-slate-500">Don't break the chain.</p>
        </header>

        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📚</span>
              <span className="font-semibold text-lg">Reading</span>
            </div>
            <div className="flex items-center gap-2 text-orange-500 font-bold text-xl">
              <Flame className="fill-orange-500" /> 12 days
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">💪</span>
              <span className="font-semibold text-lg">Exercise</span>
            </div>
            <div className="flex items-center gap-2 text-orange-500 font-bold text-xl">
              <Flame className="fill-orange-500" /> 8 days
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📝</span>
              <span className="font-semibold text-lg">Study</span>
            </div>
            <div className="flex items-center gap-2 text-orange-500 font-bold text-xl">
              <Flame className="fill-orange-500" /> 15 days
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}
