import Profile from '@/components/user-profile'
import { getUserTable } from '@/server/db'

const page = async ({ params }: any) => {
  const username = params.user
  const userData = await getUserTable()
  const user = userData.find((user) => user.username === username)
  return <Profile user={user} />
}

export default page
