'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  FaCamera,
  FaExclamationCircle,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa'
import { TailSpin } from 'react-loader-spinner'

const RegisterForm = () => {
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

  const isValidEmail = (email: string) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    return pattern
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setLoader(true)
    const email = e.target.email.value
    const username = e.target.username.value
    const name = e.target.name.value
    const password = e.target.password.value

    if (!isValidEmail(email)) {
      displayErr('invalid email')
      return null
    }

    if (!password || password.length < 6) {
      displayErr('password must be at least 6 characters')
      return null
    }

    fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        username,
        name,
        password
      })
    }).then((res) => res.json())
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
              className="peer block w-full rounded-md px-4 py-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
              id="email"
              type="text"
              name="email"
              placeholder="Email"
              required
            />
          </label>
          <label className="border-b-2" htmlFor="username">
            <input
              className="peer block w-full rounded-md px-4 py-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
              id="username"
              type="text"
              name="username"
              placeholder="Username"
              required
            />
          </label>
          <label className="border-b-2" htmlFor="name">
            <input
              className="peer block w-full rounded-md px-4 py-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
              id="name"
              type="text"
              name="name"
              placeholder="Full Name"
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
        <div className="flex justify-between w-full my-4 px-2">
          <div className="w-28 flex flex-col items-center justify-center">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              alt="img-upload"
              className="w-12 h-12 rounded-full"
            />
            <label className="cursor-pointer" htmlFor="img-upload">
              <FaCamera className="cursor-pointer relative bottom-4 left-16 text-slate-700" />
              <input type="file" id="img-upload" className="hidden" />
              <p className="text-xs mt-[-8px] font-medium text-center text-slate-700">
                Upload Profile Picture
              </p>
            </label>
          </div>
          <div className="text-slate-700">
            <textarea
              name="bio"
              id="bio"
              rows={3}
              cols={30}
              placeholder="Bio"
              className="w-full outline-none resize-none border-b-2 p-2"
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
