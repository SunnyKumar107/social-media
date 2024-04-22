import HomePage from '@/components/HomePage'
import SideNav from '@/components/SideNav'

export default async function Home() {
  return (
    <div className="max-w-screen-lg w-full h-full flex relative">
      <SideNav />
      <HomePage />
    </div>
  )
}
