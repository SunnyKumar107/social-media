'use client'

import { BiCommentDetail } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'
import { IoShareSocial } from 'react-icons/io5'
import { LuDot } from 'react-icons/lu'

const Post = ({ post }: any) => {
  const timeExtractor = () => {
    const totalTime = new Date() - post.createdAt
    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24
    if (totalTime < minute) {
      return `${Math.floor(totalTime / 1000)}sec ago`
    } else if (totalTime < hour) {
      return `${Math.floor(totalTime / minute)}mintes ago`
    } else if (totalTime < day) {
      return `${Math.floor(totalTime / hour)} hours ago`
    } else {
      return `${Math.floor(totalTime / day)} days ago`
    }
  }

  return (
    <div className="flex flex-col w-screen  sm:w-[480px] border-b-[1px] border-gray-200 py-2">
      <div className="flex items-center justify-between w-full mb-3 px-2 md:px-1">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
            <img
              className="h-full w-full"
              src={
                post.author.img
                  ? post.author.img
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
              }
              alt=""
            />
          </div>
          <div className="flex items-center ml-2">
            <h3 className="flex items-center font-semibold text-base">
              {post.author.username}
              <LuDot />
            </h3>
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
        <img src={post.img} alt={post.img} />
      </div>
      <div className="flex items-center justify-between text-[24px] text-gray-700 px-2 md:px-1 my-2">
        <div className="flex space-x-5">
          <div>
            <FaRegHeart />
          </div>
          <div>
            <BiCommentDetail />
          </div>
        </div>
        <div>
          <IoShareSocial />
        </div>
      </div>
      {post.likes !== 0 ? (
        <div className="text-gray-600 text-sm px-2 md:px-1">
          Liked by{' '}
          <span className="text-black font-semibold">good_luck_0701</span> and{' '}
          <span className="text-black font-semibold">others</span>
        </div>
      ) : (
        <div className="text-sm font-medium px-2 md:px-1">
          {post.likes} likes
        </div>
      )}
      {post.caption && (
        <div className="text-sm font-medium mt-2 px-2 md:px-1">
          {post.caption}
        </div>
      )}
    </div>
  )
}

export default Post
