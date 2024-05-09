'use client'

import { addComment } from '@/server/db/action'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { useToast } from './ui/use-toast'

const CommentBox = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState('')
  const { data: session } = useSession()
  const { toast } = useToast()

  console.log('commentBox', session)

  const handleAddComment = async () => {
    if (!comment) {
      toast({
        title: 'Comment cannot be empty',
        description: 'Please enter a comment',
        variant: 'destructive'
      })
      return null
    }
    const res = await addComment({
      postId: postId,
      authorId: session?.user.id as string,
      comment: comment
    })

    if (res.success) {
      toast({
        title: 'Comment added successfully'
      })
      setComment('')
      return null
    }

    toast({
      title: 'Something went wrong',
      description: 'Please try again',
      variant: 'destructive'
    })
  }

  return (
    <div className="w-full h-12 flex items-center justify-between border-t-[1px] md:border-t-0 md:border-b-[1px] border-gray-200 fixed md:absolute bottom-0 z-20 bg-white">
      <div className="w-full">
        <textarea
          name="comment"
          id="comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          cols={30}
          rows={1}
          className="peer block w-full h-full resize-none p-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
        />
      </div>
      <div className="flex items-center px-2 py-1">
        {comment ? (
          <button onClick={handleAddComment} className="text-2xl">
            <IoMdSend />
          </button>
        ) : null}
      </div>
    </div>
  )
}

export default CommentBox
