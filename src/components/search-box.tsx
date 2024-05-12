'use client'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import { IoSearch } from 'react-icons/io5'
import User from './user'
import { useEffect, useState } from 'react'
import { getUserTable } from '@/server/db'
import { Button } from './ui/button'

export function SearchBox() {
  const [users, setUsers] = useState<any>(null)
  const [search, setSearch] = useState('')

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const result = await getUserTable()
  //     console.log('result', result)
  //     setUsers([...result])
  //   }
  //   fetchUsers()
  // }, [])
  // console.log('users', users)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="normal"
          className="w-full flex items-center justify-center md:justify-start space-x-4 px-7 md:px-4 py-6"
        >
          <span className="text-2xl">
            <IoSearch />
          </span>
          <span className="hidden md:block text-[17px] font-normal">
            Search
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[360px] sm:max-w-[425px] min-h-[400px] max-h-[500px]">
        <DialogHeader className="mt-6">
          <Input
            id="name"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            defaultValue={''}
            className="col-span-3"
          />
        </DialogHeader>
        <div className="w-full flex flex-col items-center gap-3">
          <User />
          <User />
          <User />
          <User />
          <User />
        </div>
      </DialogContent>
    </Dialog>
  )
}
