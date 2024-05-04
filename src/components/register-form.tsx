'use client'

import { imageRemove } from '@/lib/imageRemove'
import { createUser } from '@/server/db/action'
import { UploadButton } from '@/utils/uploadthing'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FaExclamationCircle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { RxCross2 } from 'react-icons/rx'
import { TailSpin } from 'react-loader-spinner'

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [loader, setLoader] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  const [imgKey, setImgKey] = useState('')
  const [delLoading, setDelLoading] = useState(false)
  const router = useRouter()

  const displayErr = (msg: string) => {
    setErrMsg(msg)
    setLoader(false)
    setTimeout(() => {
      setErrMsg('')
    }, 3000)
  }

  const handleDelete = async () => {
    setDelLoading(!delLoading)
    const res = await imageRemove(imgKey)
    if (res.success) {
      setDelLoading(false)
      setImgKey('')
      setImgUrl('')
    }
  }

  const isValidEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    return pattern
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    const email = e.target.email.value
    const username = e.target.username.value
    const name = e.target.name.value
    const password = e.target.password.value
    const bio = e.target.bio.value

    if (!isValidEmail(email)) {
      displayErr('invalid email')
      return null
    }

    if (!password || password.length < 6) {
      displayErr('password must be at least 6 characters')
      return null
    }

    const res = await createUser({
      email,
      username,
      name,
      password,
      imgUrl,
      bio
    })
    if (res.success) {
      setLoader(false)
      router.replace('/login')
    }
    if (!res.success) {
      setLoader(false)
      displayErr(res.message)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[500px] md:w-[500px] min-h-[450px] bg-white rounded-sm shadow px-2 py-4">
      <div className="w-full text-center mb-2">
        <h1 className="text-2xl font-mono mb-0">REGISTER</h1>
        <p className="text-sm text-gray-500 font-medium">
          Create a new account
        </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        {errMsg && (
          <div className="w-full flex items-center justify-center space-x-1 px-4 py-1 bg-red-100 text-red-500 text-sm font-semibold rounded-sm mb-2">
            <FaExclamationCircle />
            <p className="">{errMsg}</p>{' '}
          </div>
        )}
        <div className="flex flex-col gap-6 w-full">
          <label className="border-b-2" htmlFor="email">
            <input
              className="peer block w-full px-4 py-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              required
            />
          </label>
          <label className="border-b-2" htmlFor="username">
            <input
              className="peer block w-full px-4 py-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </label>
          <label className="border-b-2" htmlFor="name">
            <input
              className="peer block w-full px-4 py-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Full Name"
              required
            />
          </label>
          <label className="border-b-2 flex items-center" htmlFor="password">
            <input
              className="peer block w-full px-4 py-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
              id="password"
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              required
            />
            <div className="text-gray-600 text-lg px-4 py-2 font-medium float-right">
              {showPassword ? (
                <FaEyeSlash
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaEye
                  className="cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </label>
        </div>
        <div className="flex justify-between w-full my-4">
          <div className="flex items-center justify-center">
            {imgUrl ? (
              <div className="flex flex-col items-center justify-center w-32 relative">
                <button
                  onClick={handleDelete}
                  disabled={delLoading}
                  className="absolute top-0 right-2 bg-slate-800 hover:bg-slate-700 rounded-full text-white p-1 text-sm font-medium"
                >
                  {delLoading ? (
                    <TailSpin
                      color="white"
                      height={15}
                      width={15}
                      strokeWidth={4}
                    />
                  ) : (
                    <RxCross2 />
                  )}
                </button>
                <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
                  <Image
                    src={imgUrl}
                    alt="imgUrl-upload"
                    width={30}
                    height={30}
                    className="w-full min-h-20 object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full h-full border border-dotted border-slate-300 rounded p-1">
                <UploadButton
                  endpoint="imageUploader"
                  onClientUploadComplete={(res: any) => {
                    setImgUrl(res[0].url)
                    setImgKey(res[0].key)
                  }}
                  onUploadError={(error: Error) => {
                    displayErr(error.message)
                  }}
                />
              </div>
            )}
          </div>
          <div className="border-b-2">
            <textarea
              name="bio"
              id="bio"
              rows={3}
              cols={20}
              placeholder="Bio"
              className="peer block w-full h-full resize-none p-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
            />
          </div>
        </div>
        <button
          className={`w-full rounded-md px-3 py-2 bg-slate-800 hover:bg-slate-700 font-semibold text-base text-center text-white ${
            loader && 'cursor-not-allowed bg-slate-700'
          }`}
          disabled={loader}
        >
          {loader ? (
            <span className="w-full flex justify-center">
              <TailSpin color="white" strokeWidth={4} height={24} width={18} />
            </span>
          ) : (
            'REGISTER'
          )}
        </button>
        <div className="mt-4 font-semibold text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Link
              href="/login"
              className="cursor-pointer text-sky-500 hover:text-sky-600 underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default RegisterForm
