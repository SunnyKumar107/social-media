'use client'

import { signIn, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, FormEvent } from 'react'
import { FaExclamationCircle, FaEye, FaEyeSlash } from 'react-icons/fa'
import { TailSpin } from 'react-loader-spinner'
import { useToast } from './ui/use-toast'

export default function LoginForm() {
  const session = useSession()
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [errMsg, setErrMsg] = useState<string>('')
  const [loader, setLoader] = useState<boolean>(false)

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

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoader(true)
    const form = e.target as HTMLFormElement
    const email = form.email.value
    const password = form.password.value

    if (!isValidEmail(email)) {
      displayErr('invalid email')
      return null
    }

    if (!password || password.length < 6) {
      displayErr('password must be at least 6 characters')
      return null
    }

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password
      })

      setLoader(false)
      if (res?.error) {
        displayErr('Invalid email or password')
        return
      }
      router.replace('/')
      toast({
        description: 'Logged in successfully!'
      })
    } catch (error) {
      displayErr('Some error occurred')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-[500px] md:w-[500px] h-[450px] bg-white rounded-sm shadow px-8 py-4">
      <div className="w-full text-center mb-2">
        <h1 className="text-2xl font-mono mb-0">LOGIN</h1>
        <p className="text-sm text-gray-500 font-medium">
          Please enter your credentials
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
        <button
          className={`mt-8 w-full rounded-md px-3 py-2 bg-slate-800 hover:bg-slate-700 font-semibold text-base text-center text-white ${
            loader && 'bg-slate-700'
          }`}
          disabled={loader}
        >
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
            <Link
              href="/register"
              className="cursor-pointer text-sky-500 hover:text-sky-600 underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  )
}
