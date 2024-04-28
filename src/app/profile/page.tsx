import Profile from '@/components/user-profile'
import { getUserTable } from '@/server/db'

const page = async () => {
  const postData = await getUserTable()
  const user = postData[0]

  return <Profile user={user} />
}

export default page
