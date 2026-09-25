import Shell from '@/components/Shell'
import DashboardClient from '@/components/DashboardClient'
import prisma from '@/lib/db'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const session = await getSession()
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({ where: { id: session.userId } })
  
  return (
    <Shell>
      <DashboardClient userName={user?.name || 'User'} />
    </Shell>
  )
}
