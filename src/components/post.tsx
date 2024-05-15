'use client'

import { addLike, deleteLike } from '@/server/db/action'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BiCommentDetail } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { LuDot } from 'react-icons/lu'
import { useToast } from './ui/use-toast'
import { ShareUrl } from './share-url'
import { useEffect, useState } from 'react'

const Post = ({ post }: any) => {
  const [isLike, setIsLike] = useState(false)
  const [totalLikes, setTotalLikes] = useState(post.likes.length)
  const pathname = usePathname()
  const { data: session } = useSession()
  const { toast } = useToast()

  const isUserLike = post.likes.find(
    (u: any) => u.authorId === session?.user.id
  )

  useEffect(() => {
    if (isUserLike) {
      setIsLike(true)
    }
  }, [session])

  const timeExtractor = () => {
    const totalTime = Number(new Date()) - Number(new Date(post.createdAt))
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    const week = day * 7
    if (totalTime < minute) {
      return `${Math.floor(totalTime / 1000)} sec ago`
    } else if (totalTime < minute * 2) {
      return `${Math.floor(totalTime / minute)} minute ago`
    } else if (totalTime < hour) {
      return `${Math.floor(totalTime / minute)} minutes ago`
    } else if (totalTime < hour * 2) {
      return `${Math.floor(totalTime / minute)} hour ago`
    } else if (totalTime < day) {
      return `${Math.floor(totalTime / hour)} hours ago`
    } else {
      if (totalTime > day * 14)
        return `${Math.floor(totalTime / week)} weeks ago`
      if (totalTime > day * 7) return '1 week ago'
      if (totalTime < 2 * day) return '1 day ago'
      return `${Math.floor(totalTime / day)} days ago`
    }
  }

  const handleUpdateLike = async () => {
    setIsLike(!isLike)
    if (isLike) {
      if (totalLikes > 0) setTotalLikes(totalLikes - 1)
      const res = await deleteLike(session?.user.id as string)
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
    const res = await addLike({
      postId: post.id,
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
    <div
      className={`flex flex-col w-screen  sm:w-[480px] pb-1 ${
        pathname === '/' && 'border-gray-200 border-b-[1px]'
      }`}
    >
      <div className="flex items-center justify-between w-full px-2 md:px-1 py-2">
        <div className="flex items-center">
          <Link
            href={`/${post.author.username}`}
            className="flex items-centre w-8 h-8 rounded-full overflow-hidden bg-gray-200"
          >
            <Image
              src={
                post.author.img
                  ? post.author.img
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
              }
              alt={post.author.username}
              width={40}
              height={40}
            />
          </Link>
          <div className="flex items-center ml-2">
            <Link href={`/${post.author.username}`}>
              <h3 className="flex items-center font-semibold text-sm">
                {post.author.username}
                <LuDot />
              </h3>
            </Link>
            <span className="flex items-center font-normal text-xs">
              {timeExtractor()}
            </span>
          </div>
        </div>
        <div className="text-xl">
          <BsThreeDots />
        </div>
      </div>
      <div className="flex items-center w-full max-h-[500px] overflow-hidden bg-gray-200">
        <Image
          src={post.img}
          alt={post.caption}
          width={500}
          height={500}
          className="w-full"
        />
      </div>
      <div className="flex items-center justify-between px-2 sm:px-1 mt-2 mb-1">
        <div className="flex space-x-5">
          <button
            onClick={handleUpdateLike}
            disabled={!session}
            className="text-2xl font-normal"
          >
            {isLike ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
          </button>
          <Link href={`/post/${post.id}`} className="text-2xl font-normal">
            <BiCommentDetail />
          </Link>
        </div>
        <div>
          <ShareUrl postId={post.id} />
        </div>
      </div>
      {totalLikes ? (
        <div className="text-sm font-medium mb-1 px-2 sm:px-1">
          {totalLikes} {totalLikes === 1 ? 'like' : 'likes'}
        </div>
      ) : null}
      {post.caption && (
        <div className="flex gap-2 text-sm px-2 sm:px-1">
          <h3 className="flex items-center font-semibold">
            {post.author.username}
          </h3>{' '}
          <span className="">{post.caption}</span>
        </div>
      )}
      {post.comments.length > 0 && (
        <Link
          href={`/post/${post.id}`}
          className={`text-sm text-gray-500 font-normal px-2 md:px-1 cursor-pointer ${
            pathname === `/post/${post.id}` && 'hidden'
          }`}
        >
          View {post.comments.length > 1 ? 'all' : ''} {post.comments.length}{' '}
          {post.comments.length > 1 ? 'comments' : 'comment'}
        </Link>
      )}
    </div>
  )
}

export default Post
