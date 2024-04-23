import HomePage from '@/components/HomePage'
import { getPostTable } from '@/server/db'

export default async function Home() {
  const posts = await getPostTable()

  return (
    <div className="md:ml-60">
      <HomePage posts={posts} />
    </div>
  )
}
