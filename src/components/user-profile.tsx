'use client'

import { useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

const Profile = ({ user }: any) => {
  const { data: session } = useSession()

  return (
    <div className="flex flex-col justify-start mt-14 mb-12 md:mb-0 md:mt-0 md:ml-60 md:px-4 lg:px-16 py-4 md:py-8">
      <div className="px-0 md:px-12 border-b w-full h-fit border-gray-300">
        <div className="flex gap-4 md:gap-8 w-screen md:w-full px-2">
          <div className="min-w-[70px] min-h-[70px] md:w-28 md:h-28 lg:w-36 lg:h-36 rounded-full bg-gray-200 overflow-hidden">
            <Image
              src={
                user.img
                  ? user.img
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
              }
              alt={user.username}
              width={200}
              height={200}
            />
          </div>
          <div className="flex justify-between w-full max-w-[350px] text-center px-4 py-2 md:py-8">
            <div>
              <h4 className="font-medium text-lg">{user.posts.length}</h4>
              <p className="text-gray-600 text-sm">post</p>
            </div>
            <div>
              <h4 className="font-medium text-lg">107</h4>
              <p className="text-gray-600 text-sm">followers</p>
            </div>
            <div>
              <h4 className="font-medium text-lg">84</h4>
              <p className="text-gray-600 text-sm">following</p>
            </div>
          </div>
        </div>
        <div className="p-2 md:px-8">
          <h4 className="font-medium text-lg">{user.name}</h4>
          {user.bio && <p className="text-gray-800">{user.bio}</p>}
        </div>
        {session?.user?.email === user?.email && (
          <div className="flex w-full gap-4 p-2">
            <button className="bg-gray-200 max-w-72 hover:bg-gray-300 text-sm font-medium rounded-md w-full py-1  space-x-4">
              Edit Profile
            </button>
            <button className="bg-gray-200 max-w-72 hover:bg-gray-300 text-sm font-medium rounded-md w-full py-1 space-x-4">
              Share Profile
            </button>
          </div>
        )}
      </div>
      <div className="">
        <h2 className="text-sm font-medium p-2">POSTS</h2>
        <div className="grid grid-cols-3 gap-1 w-full px-2">
          {user.posts
            ? user.posts.map((post: any) => (
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
              ))
            : null}
        </div>
      </div>
    </div>
  )
}

export default Profile
