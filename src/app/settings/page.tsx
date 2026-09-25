import Shell from '@/components/Shell'

export default function SettingsPage() {
  return (
    <Shell>
      <div className="space-y-8">
        <header>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Settings</h1>
          <p className="text-slate-500">Manage your preferences.</p>
        </header>
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm text-slate-500 text-center py-12">
          Settings configuration is coming soon.
        </div>
      </div>
    </Shell>
  )
}
