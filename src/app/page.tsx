import Post from '@/components/Post'
import Suggest from '@/components/Suggest'
import { getPostTable } from '@/server/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const displayPost = async () => {
  const postsData = await getPostTable()
  // const comments = await getCommentsTable()
  // await addComment(
  //   '4d257cb0-7483-4be0-8853-197336650195',
  //   'b21a8dc2-c5f2-48c1-9216-702c11e89779',
  //   'Elephants are the largest living land animals.'
  // )
  if (!postsData) {
    return null
  }

  const reversedPosts = postsData.reverse()
  return (
    <div className="flex flex-col flex-wrap mt-14 mb-12 md:mb-0 md:mt-0 sm:px-10 md:px-16 xl:px-28 gap-2">
      {reversedPosts.map((post) => (
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
