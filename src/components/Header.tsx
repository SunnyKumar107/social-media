'use client'

import Logo from './Logo'
import { MdOutlineSettings } from 'react-icons/md'
import { useState } from 'react'
import Setting from './settings'

const Header = () => {
  const [showSetting, setShowSetting] = useState(false)

  return (
    <div className="flex items-center justify-between md:hidden w-screen h-[60px] fixed top-0 bg-white z-10 p-2">
      <Logo />
      <div className="text-2xl">
        <MdOutlineSettings
          className="cursor-pointer"
          onClick={() => setShowSetting(!showSetting)}
        />
      </div>
      <div className="absolute top-[60px] right-0 z-10">
        {showSetting && <Setting setShowSetting={setShowSetting} />}
      </div>
    </div>
  )
}

export default Header
