import Post from '@/components/Post'
import { getPostTable } from '@/server/db'

const page = async ({ params }: any) => {
  const postData = await getPostTable()
  const post = postData.find((post) => post.id === params.id)
  return (
    <div className="flex flex-col flex-wrap mt-14 mb-12 md:mb-0 md:mt-0 sm:px-10 md:px-16 xl:px-28 gap-2 md:ml-60 md:py-4">
      <Post post={post} />
    </div>
  )
}

export default page
