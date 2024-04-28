import React from 'react'

const page = () => {
  return (
    <div className="flex flex-col justify-start mt-14 mb-12 md:mt-0 md:ml-60 md:px-4 lg:px-16 py-4 md:py-8">
      <div className="px-0 md:px-12 border-b w-full h-fit border-gray-300">
        <div className="flex w-screen md:w-full px-2">
          <div className="w-[70px] h-[70px] md:w-36 md:h-36 rounded-full bg-gray-200 mr-8 md:mr-16"></div>
          <div className="flex justify-between w-full max-w-[400px] text-center px-4 py-2">
            <div>
              <h4 className="font-medium text-lg">4</h4>
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
        <div className="px-2 py-4">
          <h4 className="font-medium text-lg">John Smith</h4>
          <p className="text-gray-800">bio toh abhi ban hi raha hai.</p>
        </div>
        <div className="flex w-full mt-4 gap-4 px-2">
          <button className="bg-gray-200 max-w-72 hover:bg-gray-300 text-sm font-medium rounded-md w-full py-1  space-x-4">
            Edit Profile
          </button>
          <button className="bg-gray-200 max-w-72 hover:bg-gray-300 text-sm font-medium rounded-md w-full py-1 space-x-4">
            Share Profile
          </button>
        </div>
      </div>
      <div className="">
        <h2 className="text-sm font-medium p-2">POSTS</h2>
        <div className="flex flex-wrap w-full justify-between">
          <div className="w-[120px] md:w-52 lg:w-80 h-[120px] md:h-52 lg:h-80 bg-gray-200"></div>
          <div className="w-[120px] md:w-52 lg:w-80 h-[120px] md:h-52 lg:h-80 bg-gray-200"></div>
          <div className="w-[120px] md:w-52 lg:w-80 h-[120px] md:h-52 lg:h-80 bg-gray-200"></div>
        </div>
      </div>
    </div>
  )
}

export default page
