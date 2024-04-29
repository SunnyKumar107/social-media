import Profile from '@/components/user-profile'
import { getUserTable } from '@/server/db'
import { getServerSession } from 'next-auth'

const page = async () => {
  const session = await getServerSession()
  const userData = await getUserTable()
  const user = userData.find((user) => user.email === session?.user?.email)

  return <Profile user={user} />
}

export default page
