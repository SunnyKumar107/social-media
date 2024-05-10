'use client'

import { addComment } from '@/server/db/action'
import { useSession } from 'next-auth/react'
import React, { useEffect, useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io'
import { RiSendPlaneFill } from 'react-icons/ri'
import { useToast } from './ui/use-toast'
import Image from 'next/image'

const CommentBox = ({ postId }: { postId: string }) => {
  const [comment, setComment] = useState('')
  const { data: session } = useSession()
  const { toast } = useToast()
  const textAreaRef = useRef<any>(null)

  useEffect(() => {
    textAreaRef.current.style.height = 'auto'
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
  }, [comment])

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
    <div className="w-full flex items-center justify-between space-x-2 border-t-[1px] md:border-t-0 border-gray-200 fixed md:absolute bottom-0 z-20 bg-white p-2">
      <div className="rounded-md w-full flex items-center justify-between space-x-2">
        <div className="min-w-7 min-h-7 rounded-full overflow-hidden">
          <Image
            className="min-h-7 object-cover"
            src={
              session?.user.img
                ? session?.user.img
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
            }
            alt={session?.user.name as string}
            width={40}
            height={40}
          />
        </div>
        <div className="w-full">
          <textarea
            name="comment"
            id="comment"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            cols={30}
            rows={1}
            ref={textAreaRef}
            className="peer block w-full h-full resize-none p-2 text-sm text-gray-700  focus:outline-none active:outline-none placeholder:text-gray-500"
          />
        </div>
      </div>
      <div className="flex items-center p-2">
        <button
          onClick={handleAddComment}
          className="text-2xl"
          disabled={!comment}
        >
          {comment ? <RiSendPlaneFill /> : <IoMdSend />}
        </button>
      </div>
    </div>
  )
}

export default CommentBox
