import HomePage from '@/components/HomePage'
import SideNav from '@/components/SideNav'
import { getPostTable } from '@/server/db'

export default async function Home() {
  const posts = await getPostTable()

  return (
    <>
      <SideNav />
      <HomePage posts={posts} />
    </>
  )
}
