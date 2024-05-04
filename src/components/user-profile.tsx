'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { CiCamera } from 'react-icons/ci'

const Profile = ({ user }: any) => {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col justify-start mt-14 mb-12 md:mb-0 md:mt-0 md:ml-60 md:px-4 lg:px-16 py-4 md:py-8">
      <div className="px-0 xl:px-12 border-b w-full h-fit border-gray-300">
        <div className="flex items-center space-x-4 lg:space-x-8 justify-between md:justify-start w-screen md:w-full px-6">
          <div className="w-20 h-20 md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full bg-gray-200 overflow-hidden">
            <Image
              className="object-cover w-full min-h-full"
              src={
                user.img
                  ? user.img
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
              }
              alt={user.username}
              width={50}
              height={50}
            />
          </div>
          <div className="flex justify-between w-56 sm:w-full  max-w-[350px] md:w-[350px] text-center py-2 md:py-8">
            <div>
              <h4 className="font-medium text-lg">{user.posts.length}</h4>
              <p className="text-gray-800 text-sm">post</p>
            </div>
            <div>
              <h4 className="font-medium text-lg">0</h4>
              <p className="text-gray-800 text-sm">followers</p>
            </div>
            <div>
              <h4 className="font-medium text-lg">0</h4>
              <p className="text-gray-800 text-sm">following</p>
            </div>
          </div>
        </div>
        <div className="py-2 px-2 md:px-4">
          <h4 className="font-medium text-base md:text-lg text-slate-900 ">
            {user.name}
          </h4>
          {user.bio && (
            <p className="text-gray-800 font-light text-sm">{user.bio}</p>
          )}
        </div>

        <div className="flex items-center justify-between md:justify-start w-full space-x-4 p-2">
          {session?.user?.email === user?.email ? (
            <button className="bg-gray-200 max-w-72 hover:bg-gray-300 text-sm text-slate-900 font-medium rounded-md w-full py-2  space-x-4">
              Edit Profile
            </button>
          ) : (
            <button className="bg-sky-600 max-w-72 hover:bg-sky-500 text-sm text-white font-medium rounded-md w-full py-2  space-x-4">
              Follow
            </button>
          )}
          <button className="bg-gray-200 max-w-72 hover:bg-gray-300 text-sm font-medium rounded-md w-full py-2 space-x-4">
            Share Profile
          </button>
        </div>
      </div>
      <div className="">
        {user.posts.length ? (
          <div className="grid grid-cols-3 gap-1 w-full px-2">
            {user.posts.map((post: any) => (
              <Link
                href={`/post/${post.id}`}
                key={post.id}
                className="w-[123px] md:w-52 lg:w-80 h-[123px] md:h-52 lg:h-80 bg-gray-200 mb-1 overflow-hidden"
              >
                <Image
                  className="w-full h-full object-cover"
                  src={post.img}
                  alt={post.caption}
                  width={400}
                  height={500}
                />
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col py-20 gap-4 items-center justify-center">
            <div className="text-4xl border-2 border-slate-900 rounded-full p-4">
              <CiCamera />
            </div>
            <div className="text-2xl text-slate-900 font-medium">
              No Posts Yet
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
