'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FaRegHeart } from 'react-icons/fa'

const Comment = ({ cmnt }: any) => {
  if (!cmnt) {
    return null
  }
  return (
    <div className="flex justify-between w-full px-2 md:px-1 py-2">
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
            alt={cmnt.author.username}
            width={40}
            height={40}
          />
        </Link>
        <div className="max-w-[300px] md:max-w-[350px] flex flex-col justify-start">
          <Link
            href={`/${cmnt.author.username}`}
            className="text-xs font-medium mr-1"
          >
            {cmnt.author.username}
          </Link>
          <p className="text-sm">{cmnt.comment}</p>
        </div>
      </div>
      <div className="">
        <button className="text-sm font-bold">
          <FaRegHeart />
        </button>
      </div>
    </div>
  )
}

export default Comment
