'use client'

import { likeComment, removeLikeComment } from '@/server/db/action'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { useToast } from './ui/use-toast'

const Comment = ({ cmnt }: any) => {
  const [totalLikes, setTotalLikes] = useState(cmnt.likedBy.length)
  const [isLike, setIsLike] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()

  const isUserLike = cmnt.likedBy.find(
    (u: any) => u.authorId === session?.user.id
  )

  useEffect(() => {
    if (isUserLike) setIsLike(true)
  }, [session])

  const handleUpdateLike = async () => {
    setIsLike(!isLike)
    if (isLike) {
      if (totalLikes > 0) setTotalLikes(totalLikes - 1)
      const res = await removeLikeComment(session?.user.id as string)
      if (!res?.success) {
        setIsLike(true)
        setTotalLikes(totalLikes + 1)
        toast({
          title: 'Something went wrong',
          description: 'Please try again',
          variant: 'destructive'
        })
      }
      return
    }

    setTotalLikes(totalLikes + 1)
    const res = await likeComment({
      commentId: cmnt.id,
      authorId: session?.user.id as string
    })
    if (!res?.success) {
      setIsLike(false)
      setTotalLikes(totalLikes - 1)
      toast({
        title: 'Something went wrong',
        description: 'Please try again',
        variant: 'destructive'
      })
    }
  }

  return (
    <div className="flex justify-between w-full px-2 md:px-1 py-3">
      <div className="flex items-start space-x-3">
        <Link
          href={`/${cmnt.author.username}`}
          className="w-9 h-9 rounded-full overflow-hidden bg-gray-200"
        >
          <Image
            className="min-h-9 object-cover"
            src={
              cmnt.author.img
                ? cmnt.author.img
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
            }
            alt={cmnt.author.name}
            width={40}
            height={40}
          />
        </Link>
        <div className="max-w-[300px] md:max-w-[350px] flex flex-col justify-start">
          <Link
            href={`/${cmnt.author.username}`}
            className="text-xs font-medium"
          >
            {cmnt.author.username}
          </Link>
          <p className="text-sm">{cmnt.comment}</p>
        </div>
      </div>
      <div className="flex flex-col justify-start items-center">
        <button
          onClick={handleUpdateLike}
          disabled={!session}
          className="text-sm font-medium"
        >
          {isLike ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
        </button>
        {totalLikes > 0 && <p className="text-xs">{totalLikes}</p>}
      </div>
    </div>
  )
}

export default Comment
