import Shell from '@/components/Shell'

export default function ProfilePage() {
  return (
    <Shell>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Profile</h1>
          <p className="text-slate-500">Your account details.</p>
        </header>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-slate-500 text-center py-12">
          Profile management is coming soon.
        </div>
      </div>
    </Shell>
  )
}
