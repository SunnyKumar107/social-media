import Post from '@/components/Post'
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
    <div className="flex flex-col flex-wrap mt-14 mb-12 md:mb-0 md:mt-0 sm:px-10 md:px-16 xl:px-28 gap-2 md:ml-60 md:py-4">
      <Post post={post} />
      <div className="w-full sm:w-[480px] flex flex-col gap-2">
        {commentOfPost.map((comment: any) => (
          <Comment key={comment.id} cmnt={comment} />
        ))}
      </div>
    </div>
  )
}

export default page
