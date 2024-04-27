import { BiCommentDetail } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { FaRegHeart } from 'react-icons/fa'
import { IoShareSocial } from 'react-icons/io5'
import { LuDot } from 'react-icons/lu'

const Post = () => {
  return (
    <div className="flex flex-col w-screen  sm:w-[480px] border-b-[1px] border-gray-200 py-2">
      <div className="flex items-center justify-between w-full mb-3 px-2 md:px-1">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
          <div className="flex items-center ml-2">
            <h3 className="flex items-center font-semibold text-base">
              johnsmith
              <LuDot />
            </h3>
            <span className="flex items-center font-extralight text-sm">
              14h
            </span>
          </div>
        </div>
        <div className="text-xl">
          <BsThreeDots />
        </div>
      </div>
      <div className="w-full h-[400px] max-h-[500px] overflow-hidden bg-gray-200">
        {/* <img src={} alt={} /> */}
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
      {/* {likes !== 0 ? (
        <div className="text-gray-600 text-sm px-2 md:px-1">
          Liked by{' '}
          <span className="text-black font-semibold">good_luck_0701</span> and{' '}
          <span className="text-black font-semibold">others</span>
        </div>
      ) : (
        <div className="text-sm font-medium px-2 md:px-1">{likes} likes</div>
      )}
      {caption && (
        <div className="text-sm font-medium mt-2 px-2 md:px-1">{caption}</div>
      )} */}
    </div>
  )
}

export default Post
