'use client'

import { CopyIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { IoShareSocial } from 'react-icons/io5'

export function ShareUrl({
  btnName,
  postId
}: {
  btnName?: string
  postId?: string
}) {
  const { data: session } = useSession()
  const pathname = usePathname()
  return (
    <Dialog>
      <DialogTrigger asChild>
        {btnName ? (
          <Button
            variant="normal"
            className="bg-gray-200 max-w-72 hover:bg-gray-300 text-sm font-medium rounded-md w-full py-2 space-x-4"
          >
            {btnName}
          </Button>
        ) : (
          <button className="text-2xl font-normal">
            <IoShareSocial />
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-[350px] sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            {btnName ? (
              <Input
                id="link"
                defaultValue={
                  pathname === '/profile'
                    ? `https://social-media-drab-nine.vercel.app/${session?.user.username}`
                    : `https://social-media-drab-nine.vercel.app${pathname}`
                }
                readOnly
              />
            ) : (
              <Input
                id="link"
                defaultValue={`https://social-media-drab-nine.vercel.app/post/${postId}`}
                readOnly
              />
            )}
          </div>
          <Button type="submit" size="sm" className="px-3">
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
