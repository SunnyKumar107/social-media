import Post from '@/components/Post'
import Suggest from '@/components/Suggest'
import { getCommentsTable, getPostTable } from '@/server/db'
import { addComment } from '@/server/db/action'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const displayPost = async () => {
  const postsData = await getPostTable()
  // const comments = await getCommentsTable()
  // console.log('postsData', postsData[1])
  // console.log('comments', comments)
  // await addComment(
  //   '5d82b887-f56e-4d9c-9f35-2c0d6c65b027',
  //   'a7a0cdfa-acbf-457e-9c23-d901201861d2',
  //   'Elephants are the largest living land animals.'
  // )
  if (!postsData) {
    return null
  }

  return (
    <div className="flex flex-col flex-wrap mt-14 mb-12 md:mb-0 md:mt-0 sm:px-10 md:px-16 xl:px-28 gap-2">
      {postsData.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  )
}

export default async function Home() {
  const session = await getServerSession()
  if (!session) {
    redirect('/login')
  }

  return (
    <main className="flex justify-center min-h-screen md:ml-60 md:py-4">
      {displayPost()}
      <Suggest />
    </main>
  )
}
