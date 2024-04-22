import HomePage from '@/components/HomePage'
import SideNav from '@/components/SideNav'
import { getPostTable } from '@/server/db'

export default async function Home() {
  const posts = await getPostTable()

  return (
    <div className="max-w-screen-lg w-full h-full flex relative">
      <SideNav />
      <HomePage posts={posts} />
    </div>
  )
}
