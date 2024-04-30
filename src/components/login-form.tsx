'use client'

import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { FaExclamationCircle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { TailSpin } from 'react-loader-spinner'

export default function LoginForm() {
  const session = useSession()
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [loader, setLoader] = useState(false)

  const displayErr = (msg: string) => {
    setErrMsg(msg)
    setLoader(false)
    setTimeout(() => {
      setErrMsg('')
    }, 3000)
  }

  useEffect(() => {
    if (session?.status === 'authenticated') {
      router.replace('/')
    }
  }, [session, router])

  const isValidEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    return pattern
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoader(true)
    const email = e.target.email.value
    const password = e.target.password.value

    if (!isValidEmail(email)) {
      displayErr('invalid email')
      return null
    }

    if (!password || password.length < 6) {
      displayErr('password must be at least 6 characters')
      return null
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (res?.error) {
      displayErr('Invalid email or password')
      return
    } else {
      setLoader(false)
      router.replace('/')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[500px] h-[400px] flex flex-col items-center justify-center shadow-lg shadow-gray-300 px-2 py-8"
    >
      <div className="w-full text-center">
        <h1 className="text-2xl font-mono mb-0">LOGIN</h1>
        <p className="text-sm text-gray-500 font-medium">
          Please enter your credentials
        </p>
      </div>

      <div className="w-full min-h-8 flex items-center space-x-1 text-start px-4 py-1 text-red-500 text-base font-medium">
        {errMsg && (
          <>
            <FaExclamationCircle />
            <p className="">{errMsg}</p>{' '}
          </>
        )}
      </div>
      <div className="flex flex-col gap-6 w-full">
        <label className="border-b-2" htmlFor="email">
          <input
            className="peer block w-full rounded-md px-4 py-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
            id="email"
            type="text"
            name="email"
            placeholder="Email"
            required
          />
        </label>
        <label className="border-b-2 flex items-center" htmlFor="password">
          <input
            className="peer block w-full rounded-md px-4 py-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
            id="password"
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
          />
          <div className="text-gray-600 text-lg relative right-4 font-medium float-right">
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
      <button className="mt-8 w-full rounded-md px-3 py-2 bg-slate-800 hover:bg-slate-700 font-semibold text-base text-center text-white">
        {loader ? (
          <span className="w-full flex justify-center">
            <TailSpin color="white" strokeWidth={4} height={24} width={18} />
          </span>
        ) : (
          'LOGIN'
        )}
      </button>
      <div className="mt-4 font-semibold text-center">
        <p className="text-sm text-gray-500">
          Don&apos;t have an account?{' '}
          <span className="text-sky-500 cursor-pointer underline">
            Register
          </span>
        </p>
      </div>
    </form>
  )
}
