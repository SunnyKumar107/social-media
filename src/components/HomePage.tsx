import Post from '@/components/Post'
import Suggest from '@/components/Suggest'

const HomePage = () => {
  return (
    <main className="flex justify-center min-h-screen md:ml-60 md:py-4">
      <div className="flex flex-col flex-wrap mt-14 mb-12 md:mb-0 md:mt-0 sm:px-10 md:px-16 xl:px-28 gap-2">
        <Post />
        <Post />
        <Post />
      </div>
      <Suggest />
    </main>
  )
}

export default HomePage
