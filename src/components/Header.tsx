'use client'

import { useSession } from 'next-auth/react'
import Logo from './Logo'

const Header = () => {
  const { data: session } = useSession()
  if (!session) {
    return null
  }

  return (
    <div className="flex items-center justify-between md:hidden w-screen h-[60px] fixed top-0 bg-white z-10 border-b-[1px] border-gray-200 ">
      <Logo />
    </div>
  )
}

export default Header
