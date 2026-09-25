import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <CheckCircle className="w-6 h-6" />
          <span>My Daily Discipline</span>
        </div>
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors">
            Login
          </Link>
          <Link href="/register" className="px-4 py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-blue-600 transition-colors">
            Get Started
          </Link>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary text-sm font-medium mb-4">
            <span>✨ The ultimate student habit tracker</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Build better habits. <br/>
            <span className="text-primary">Track your progress.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
            Stay disciplined, maintain streaks, and achieve your goals. Whether it's studying, working out, or reading—consistency is key.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/register" className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-bold rounded-xl text-lg hover:bg-blue-600 transition-all transform hover:scale-105 shadow-lg shadow-blue-500/30">
              Start Tracking Now
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
