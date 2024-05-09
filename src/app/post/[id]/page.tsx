import Post from '@/components/Post'
import CommentBox from '@/components/add-comment-box'
import Comment from '@/components/comment'
import { getCommentsTable, getPostTable } from '@/server/db'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

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
          <div className="px-2 md:px-1 py-2 hidden md:block">
            <h1 className="text-lg font-medium">Comments</h1>
          </div>
          {commentOfPost.map((comment: any) => (
            <Comment key={comment.id} cmnt={comment} />
          ))}
        </div>
        <CommentBox postId={params.id} />
      </div>
    </div>
  )
}

export default page
