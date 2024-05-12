'use client'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { deleteUser } from '@/server/db/action'
import { signOut, useSession } from 'next-auth/react'
import { useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai'
import { TailSpin } from 'react-loader-spinner'
import { useToast } from './ui/use-toast'

export function AlertDelete() {
  const [delLoading, setDelLoading] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()

  const handleDeleteAccount = async (): Promise<void> => {
    setDelLoading(true)
    const res = await deleteUser(session?.user?.email as string)
    if (res.success) {
      await signOut()
      setDelLoading(false)
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          disabled={delLoading}
          className="cursor-pointer flex items-center justify-start space-x-1  text-red-700 font-normal py-1"
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
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[360px] sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteAccount}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
