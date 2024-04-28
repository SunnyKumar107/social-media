import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col justify-start mt-14 md:mt-0 md:ml-60 md:px-4 lg:px-16 py-8">
      <div className="p-2 md:px-12 border-b w-full h-fit border-gray-300">
        <div className="flex w-screen md:w-full">
          <div className="w-20 h-20 md:w-36 md:h-36 rounded-full bg-gray-200 mr-8 md:mr-16"></div>
          <div className="flex justify-between w-[400px] text-center px-4 py-2">
            <div>
              <h4 className="font-medium text-lg">4</h4>
              <p className="text-gray-600">Post</p>
            </div>
            <div>
              <h4 className="font-medium text-lg">107</h4>
              <p className="text-gray-600">Followers</p>
            </div>
            <div>
              <h4 className="font-medium text-lg">84</h4>
              <p className="text-gray-600">Following</p>
            </div>
          </div>
        </div>
        <div className="p-4">
          <h4 className="font-medium text-lg">John Smith</h4>
          <p className="text-gray-800">bio toh abhi ban hi raha hai.</p>
        </div>
        <div className="flex w-full justify-between mt-4 gap-4">
          <button className="bg-gray-200 hover:bg-gray-300 text-sm font-medium rounded-md w-full py-1  space-x-4">
            Edit Profile
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-sm font-medium rounded-md w-full py-1 space-x-4">
            Share Profile
          </button>
        </div>
      </div>
      <div className="">
        <h2 className="text-sm font-medium p-2">POSTS</h2>
        <div className="grid grid-cols-3 gap-2">
          <div className="w-32 md:w-52 lg:w-80 h-32 md:h-52 lg:h-80 bg-gray-200"></div>
          <div className="w-32 md:w-52 lg:w-80 h-32 md:h-52 lg:h-80 bg-gray-200"></div>
          <div className="w-32 md:w-52 lg:w-80 h-32 md:h-52 lg:h-80 bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}

export default page
