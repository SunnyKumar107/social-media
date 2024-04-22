import Link from 'next/link'
import { FaBars, FaUser } from 'react-icons/fa'
import { IoMdNotifications } from 'react-icons/io'
import { IoHomeSharp, IoSearch } from 'react-icons/io5'
import { MdAddBox } from 'react-icons/md'
import Logo from './Logo'

const NAVIGATION_ITEMS = [
  {
    title: 'Home',
    icon: IoHomeSharp
  },
  {
    title: 'Search',
    icon: IoSearch
  },
  {
    title: 'Create',
    icon: MdAddBox
  },
  {
    title: 'Notification',
    icon: IoMdNotifications
  },
  {
    title: 'Profile',
    icon: FaUser
  }
]

const SideNav = () => {
  return (
    <section className="flex md:flex-col w-screen md:w-60 bg-white md:border-r-[1px] border-t-[1px] md:border-t-0 border-gray-200 h-12 md:h-screen fixed md:p-3 bottom-0">
      <div className="hidden md:block">
        <Logo />
      </div>
      <div className="flex md:flex-col w-full h-full justify-between">
        <div className="flex md:flex-col w-full justify-between">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              className="flex h-full w-full items-center justify-center md:justify-start hover:bg-gray-200 rounded-lg px-4 py-3 mb-2 text-[17px]  space-x-4"
              href={
                item.title === 'Home'
                  ? '/'
                  : `/${item.title.toLocaleLowerCase()}`
              }
              key={item.title}
            >
              <div className="text-2xl">
                <item.icon />
              </div>
              <div className="hidden md:block">{item.title}</div>
            </Link>
          ))}
        </div>
        <div className="hover:bg-gray-300 cursor-pointer rounded-xl px-4 py-3 mb-2 text-[17px] hidden md:flex items-center justify-start space-x-4">
          <div className="text-2xl">
            <FaBars />
          </div>
          <div>More</div>
        </div>
      </div>
    </section>
  )
}

export default SideNav
