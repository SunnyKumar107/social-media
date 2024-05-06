'use client'

import Image from 'next/image'
import { FaRegHeart } from 'react-icons/fa'

const Comment = ({ cmnt }: any) => {
  if (!cmnt) {
    return null
  }
  return (
    <div className="flex justify-between w-full px-2 md:px-1 py-2">
      <div className="flex space-x-2">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
          <Image
            className="min-h-8 object-cover"
            src={
              cmnt.author.img
                ? cmnt.author.img
                : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
            }
            alt={cmnt.author.username}
            width={40}
            height={40}
          />
        </div>
        <div className="text-sm py-1">
          <span className="text-sm font-medium mr-2">
            {cmnt.author.username}
          </span>
          <span className="text-sm">{cmnt.comment}</span>
        </div>
      </div>
      <div>
        <button className="text-xs font-bold px-2 py-1">
          <FaRegHeart />
        </button>
      </div>
    </div>
  )
}

export default Comment
