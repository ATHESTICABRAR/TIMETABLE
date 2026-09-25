import Shell from '@/components/Shell'
import { Bell } from 'lucide-react'

export default function RemindersPage() {
  return (
    <Shell>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Reminders</h1>
          <p className="text-slate-500">Never miss a habit.</p>
        </header>

        <div className="space-y-4">
          {[
            { time: '7:00 AM', habit: 'Exercise', icon: '💪' },
            { time: '9:00 AM', habit: 'Study', icon: '📝' },
            { time: '8:00 PM', habit: 'Read Book', icon: '📚' },
            { time: '10:30 PM', habit: 'Sleep preparation', icon: '🛌' },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-primary rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="font-bold text-lg">{r.time}</div>
                <div className="text-slate-500 font-medium flex items-center gap-1">
                  <span>{r.icon}</span> {r.habit}
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
              </label>
            </div>
          ))}
        </div>
      </div>
    </Shell>
  )
}
