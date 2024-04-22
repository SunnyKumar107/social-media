import Post from '@/components/Post'
import Suggest from '@/components/Suggest'

const HomePage = async () => {
  return (
    <main className="flex justify-center  w-full md:ml-60 py-8">
      <div className="flex flex-col flex-wrap sm:px-10 md:px-16 xl:px-28">
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <Suggest />
    </main>
  )
}

export default HomePage
