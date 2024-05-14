import EditProfile from '@/components/edit-profile'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function page() {
  const session = await getServerSession()
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="h-screen flex items-center justify-center md:ml-60">
      <EditProfile />
    </div>
  )
}
