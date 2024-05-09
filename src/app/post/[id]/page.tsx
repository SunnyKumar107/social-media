import Post from '@/components/Post'
import Comment from '@/components/comment'
import { getCommentsTable, getPostTable } from '@/server/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { IoMdSend } from 'react-icons/io'

const page = async ({ params }: any) => {
  const session = await getServerSession()
  if (!session) {
    redirect('/login')
  }

  const postData = await getPostTable()
  const allComments = await getCommentsTable()
  const post = postData.find((post) => post.id === params.id)
  const commentOfPost = allComments.filter(
    (comment) => comment.postId === params.id
  )
  return (
    <div className="flex flex-col items-center lg:items-start lg:flex-row lg:justify-center lg:space-x-4 mt-14 mb-12 md:mb-0 md:mt-0 md:ml-60 md:p-4">
      <Post post={post} />
      <div className="w-full md:min-h-[500px] sm:w-[480px] flex flex-col md:relative">
        <div className="w-full flex flex-col flex-wrap mb-12">
          <div className="px-2 md:px-1 py-2 hidden md:absolute top-0">
            <h1 className="text-lg font-medium">Comments</h1>
          </div>
          {commentOfPost.map((comment: any) => (
            <Comment key={comment.id} cmnt={comment} />
          ))}
        </div>
        <div className="w-full h-12 flex items-center justify-between border-t-[1px] md:border-t-0 md:border-b-[1px] border-gray-200 fixed md:absolute bottom-0 z-20 bg-white">
          <div className="w-full">
            <textarea
              name="comment"
              id="comment"
              placeholder="Add a comment..."
              cols={30}
              rows={1}
              className="peer block w-full h-full resize-none p-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
            />
          </div>
          <div className="p-2">
            <button className="text-xl">
              <IoMdSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
