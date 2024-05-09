'use client'

import Link from 'next/link'
import { FaAngleLeft, FaAngleRight, FaUser } from 'react-icons/fa'
import { IoMdNotifications } from 'react-icons/io'
import { IoHomeSharp, IoSearch } from 'react-icons/io5'
import { MdAddBox, MdOutlineSettings } from 'react-icons/md'
import Logo from './Logo'
import { usePathname } from 'next/navigation'
import Setting from './settings'
import { useState } from 'react'
import { PostCreate } from './create-post'

const SideNav = () => {
  const pathname = usePathname()
  const [showSetting, setShowSetting] = useState(false)

  return (
    <section className="flex md:flex-col w-screen md:w-60 bg-white md:border-r-[1px] border-t-[1px] md:border-t-0 border-gray-200 h-12 md:h-screen fixed md:p-3 bottom-0 z-10">
      <div className="hidden md:block px-2 py-4">
        <Logo />
      </div>
      <div className="flex md:flex-col w-full h-full justify-between">
        <div className="flex md:flex-col w-full justify-between">
          <Link
            className={`flex w-full h-full items-center justify-center md:justify-start hover:bg-gray-100 rounded-lg px-4 py-3 mb-2 text-[17px]  space-x-4 ${
              pathname === '/' && ' bg-gray-100 font-medium'
            }`}
            href="/"
          >
            <div className="text-2xl">
              <IoHomeSharp />
            </div>
            <div className="hidden md:block">Home</div>
          </Link>
          <div className="flex w-full h-full items-center justify-center cursor-pointer md:justify-start hover:bg-gray-100 rounded-lg px-4 py-3 mb-2 text-[17px]  space-x-4">
            <div className="text-2xl">
              <IoSearch />
            </div>
            <div className="hidden md:block">Search</div>
          </div>
          <div className="w-full h-full  cursor-pointer hover:bg-gray-100 rounded-lg mb-2 ">
            <PostCreate />
          </div>
          <div className="flex w-full h-full items-center justify-center cursor-pointer md:justify-start hover:bg-gray-100 rounded-lg px-4 py-3 mb-2 text-[17px]  space-x-4">
            <div className="text-2xl">
              <IoMdNotifications />
            </div>
            <div className="hidden md:block">Notification</div>
          </div>
          <Link
            className={`flex w-full h-full items-center justify-center md:justify-start hover:bg-gray-100 rounded-lg px-4 py-3 mb-2 text-[17px]  space-x-4 ${
              pathname === '/profile' && ' bg-gray-100 font-medium'
            }`}
            href="/profile"
          >
            <div className="text-2xl">
              <FaUser />
            </div>
            <div className="hidden md:block">Profile</div>
          </Link>
        </div>
        <div
          className="hidden md:flex w-full items-center justify-center cursor-pointer md:justify-start hover:bg-gray-100 rounded-lg px-4 py-2 mb-1 font-medium text-base space-x-3"
          onClick={() => setShowSetting(!showSetting)}
        >
          <div className="text-2xl">
            <MdOutlineSettings />
          </div>
          <div className="w-full flex items-center justify-between">
            Settings {showSetting ? <FaAngleLeft /> : <FaAngleRight />}
          </div>
        </div>
        <div className="absolute left-60 bottom-0 z-10">
          {showSetting && <Setting setShowSetting={setShowSetting} />}
        </div>
      </div>
    </section>
  )
}

export default SideNav
