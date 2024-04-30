import Profile from '@/components/user-profile'
import { getUserTable } from '@/server/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getServerSession()
  if (!session) {
    redirect('/login')
    return
  }

  const userData = await getUserTable()
  const user = userData.find((user) => user.email === session?.user?.email)

  return <Profile user={user} />
}

export default page
