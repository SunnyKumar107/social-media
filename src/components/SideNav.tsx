'use client'

import Link from 'next/link'
import { FaUser } from 'react-icons/fa'
import { IoMdNotifications, IoMdPower } from 'react-icons/io'
import { IoHomeSharp, IoSearch } from 'react-icons/io5'
import { MdAddBox } from 'react-icons/md'
import Logo from './Logo'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const SideNav = () => {
  const pathname = usePathname()
  const { data: session } = useSession()
  if (!session) {
    return null
  }

  const handleLogout = () => {
    signOut()
  }

  return (
    <section className="flex md:flex-col w-screen md:w-60 bg-white md:border-r-[1px] border-t-[1px] md:border-t-0 border-gray-200 h-12 md:h-screen fixed md:p-3 bottom-0">
      <div className="hidden md:block">
        <Logo />
      </div>
      <div className="flex md:flex-col w-full h-full justify-between">
        <div className="flex md:flex-col w-full justify-between">
          <Link
            className={`flex h-full w-full items-center justify-center md:justify-start hover:bg-gray-200 rounded-lg px-4 py-3 mb-2 text-[17px]  space-x-4 ${
              pathname === '/' && ' bg-gray-200 font-medium'
            }`}
            href="/"
          >
            <div className="text-2xl">
              <IoHomeSharp />
            </div>
            <div className="hidden md:block">Home</div>
          </Link>
          <div className="flex h-full w-full items-center justify-center cursor-pointer md:justify-start hover:bg-gray-200 rounded-lg px-4 py-3 mb-2 text-[17px]  space-x-4">
            <div className="text-2xl">
              <IoSearch />
            </div>
            <div className="hidden md:block">Search</div>
          </div>
          <div className="flex h-full w-full items-center justify-center cursor-pointer md:justify-start hover:bg-gray-200 rounded-lg px-4 py-3 mb-2 text-[17px]  space-x-4">
            <div className="text-2xl">
              <MdAddBox />
            </div>
            <div className="hidden md:block">Create</div>
          </div>
          <div className="flex h-full w-full items-center justify-center cursor-pointer md:justify-start hover:bg-gray-200 rounded-lg px-4 py-3 mb-2 text-[17px]  space-x-4">
            <div className="text-2xl">
              <IoMdNotifications />
            </div>
            <div className="hidden md:block">Notification</div>
          </div>
          <Link
            className={`flex h-full w-full items-center justify-center md:justify-start hover:bg-gray-200 rounded-lg px-4 py-3 mb-2 text-[17px]  space-x-4 ${
              pathname === '/profile' && ' bg-gray-200 font-medium'
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
          onClick={handleLogout}
          className="cursor-pointer  px-4 py-3 mb-2 text-[17px] hidden md:flex items-center justify-start space-x-2"
        >
          <div className="bg-slate-900 hover:bg-slate-700 rounded-full text-white p-2 text-base">
            <IoMdPower />
          </div>
          <span>Log out</span>
        </div>
      </div>
    </section>
  )
}

export default SideNav
