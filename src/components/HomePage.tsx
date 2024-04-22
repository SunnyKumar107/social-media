import Post from '@/components/Post'
import Suggest from '@/components/Suggest'

const HomePage = ({ posts }: any) => {
  return (
    <main className="flex justify-center  w-full md:ml-60 py-8">
      <div className="flex flex-col flex-wrap sm:px-10 md:px-16 xl:px-28">
        {posts.map((p: any) => (
          <Post
            key={p.id}
            id={p.id}
            caption={p.caption}
            userId={p.userId}
            img={p.image}
            likes={p.likes}
            createdAt={p.createdAt}
          />
        ))}
      </div>
      <Suggest />
    </main>
  )
}

export default HomePage
