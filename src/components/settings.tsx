'use client'

import { deleteUser } from '@/server/db/action'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { IoMdPower } from 'react-icons/io'
import { RxCross2 } from 'react-icons/rx'
import { TailSpin } from 'react-loader-spinner'
import { useToast } from './ui/use-toast'

const Setting = ({ setShowSetting }: { setShowSetting: any }) => {
  const { data: session } = useSession()
  const { toast } = useToast()
  const [logoutLoading, setLogoutLoading] = useState(false)
  const [delLoading, setDelLoading] = useState(false)

  const handleLogout = async () => {
    setLogoutLoading(true)
    await signOut()
    toast({
      title: `Goodbye ${session?.user?.name}`
    })
  }

  const handleDeleteAccount = async () => {
    setDelLoading(true)
    const res = await deleteUser(session?.user?.email as string)
    if (res.success) {
      setDelLoading(false)
      handleLogout()
      toast({
        title: 'Account deleted successfully!'
      })
    } else {
      setDelLoading(false)
      toast({
        variant: 'destructive',
        title: 'Something went wrong!'
      })
    }
  }

  return (
    <div className="flex flex-col gap-1 min-h-40 min-w-48 bg-white shadow overflow-hidden relative">
      <div className="w-full flex items-center justify-between border-b-2 border-gray-200">
        <h1 className="text-lg text-slate-700 font-semibold px-2">Settings</h1>
        <button
          className="bg-gray-100 hover:bg-gray-200 p-2 text-xl"
          onClick={() => setShowSetting(false)}
        >
          <RxCross2 />
        </button>
      </div>
      <div className="px-4">
        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className={`cursor-pointer flex items-center justify-start space-x-1  text-slate-900 font-normal py-1  ${
            logoutLoading && 'cursor-not-allowed'
          }`}
        >
          <span className="py-2 text-sm">
            {logoutLoading ? (
              <TailSpin color="black" height={13} width={13} strokeWidth={3} />
            ) : (
              <IoMdPower />
            )}
          </span>
          <span className="text-start">Logout</span>
        </button>
        <button
          onClick={handleDeleteAccount}
          disabled={delLoading}
          className={`cursor-pointer flex items-center justify-start space-x-1  text-red-700 font-normal py-1  ${
            delLoading && 'cursor-not-allowed'
          }`}
        >
          <span className="py-2 text-sm">
            {delLoading ? (
              <TailSpin color="red" height={13} width={13} strokeWidth={3} />
            ) : (
              <AiOutlineDelete />
            )}
          </span>
          <span className="text-start">Delete Account</span>
        </button>
      </div>
      <Link href="/profile" className="w-full px-4 py-2 ">
        <h2 className="text-lg font-semibold text-slate-800 font-sans">
          {session?.user?.name}
        </h2>
        <p className="text-xs text-gray-800">{session?.user?.email}</p>
      </Link>
    </div>
  )
}

export default Setting
