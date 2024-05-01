'use client'

import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { IoMdPower } from 'react-icons/io'
import { MdDelete } from 'react-icons/md'
import { RxCross2 } from 'react-icons/rx'
import { TailSpin } from 'react-loader-spinner'

const Setting = ({ setShowSetting }: { setShowSetting: any }) => {
  const { data: session } = useSession()
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [delLoading, setDelLoading] = useState(false)

  const handleLogout = () => {
    setLogoutLoading(true)
    signOut()
  }

  return (
    <div className="flex flex-col gap-2 h-60 w-64 p-2 bg-white overflow-hidden">
      <button
        className="absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 p-2 text-xl"
        onClick={() => setShowSetting(false)}
      >
        <RxCross2 />
      </button>
      <div className="w-full p-2 mb-8">
        <h2 className="text-3xl font-medium text-slate-900 font-sans">
          {session?.user?.name}
        </h2>
        <p className="text-sm text-gray-800">{session?.user?.email}</p>
      </div>
      <button
        onClick={handleLogout}
        disabled={logoutLoading}
        className={`cursor-pointer flex items-center justify-start space-x-1  text-slate-900 font-semibold p-2 rounded-lg ${
          logoutLoading && 'cursor-not-allowed'
        }`}
      >
        <span className="bg-slate-900 hover:bg-slate-700 rounded-full text-white p-2 text-sm">
          {logoutLoading ? (
            <TailSpin color="white" height={15} width={15} strokeWidth={3} />
          ) : (
            <IoMdPower />
          )}
        </span>
        <span className="w-full bg-gray-100 text-start px-2 py-1 rounded-md">
          Logout
        </span>
      </button>
      <button
        disabled={delLoading}
        className={`cursor-pointer flex items-center justify-start space-x-1  text-red-700 font-semibold p-2 rounded-lg ${
          delLoading && 'cursor-not-allowed'
        }`}
      >
        <span className="bg-red-700 hover:bg-red-600 rounded-full text-white p-2 text-sm">
          {delLoading ? (
            <TailSpin color="white" height={15} width={15} strokeWidth={3} />
          ) : (
            <MdDelete />
          )}
        </span>
        <span className="w-full bg-red-100 text-start px-2 py-1 rounded-md">
          Delete Account
        </span>
      </button>
    </div>
  )
}

export default Setting
