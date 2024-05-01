import Profile from '@/components/user-profile'
import { getUserTable } from '@/server/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const page = async ({ params }: any) => {
  const session = await getServerSession()
  if (!session) {
    redirect('/login')
  }

  const username = params.user
  const userData = await getUserTable()
  const user = userData.find((user) => user.username === username)
  return <Profile user={user} />
}

export default page
