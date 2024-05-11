import Post from '@/components/post'
import Suggest from '@/components/suggest'
import { getPostTable } from '@/server/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const displayPost = async () => {
  const postsData = await getPostTable()
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
    <main className="flex justify-center min-h-screen md:ml-60 md:py-4 pt-2">
      {displayPost()}
      <Suggest />
    </main>
  )
}
