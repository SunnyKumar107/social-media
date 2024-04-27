import Post from '@/components/Post'
import Suggest from '@/components/Suggest'
import { getPostTable } from '@/server/db'

export default async function Home() {
  const postsData = await getPostTable()
  return (
    <main className="flex justify-center min-h-screen md:ml-60 md:py-4">
      <div className="flex flex-col flex-wrap mt-14 mb-12 md:mb-0 md:mt-0 sm:px-10 md:px-16 xl:px-28 gap-2">
        {postsData.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
      <Suggest />
    </main>
  )
}
