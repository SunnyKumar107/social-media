import Profile from '@/components/user-profile'
import { authOptions } from '@/server/auth'
import { getUserTable } from '@/server/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const page = async () => {
  const session: {
    user: {
      name: string
      email: string
      image: undefined
      id: string
      username: string
      img: string
    }
  } | null = await getServerSession(authOptions)
  if (!session) {
    redirect('/login')
  }

  const userData = await getUserTable()
  const user = userData.find((user) => user.id === session?.user?.id)

  return <Profile user={user} />
}

export default page
