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
import { Button } from '@/components/ui/button'
import { UploadButton } from '@/utils/uploadthing'
import { useState } from 'react'
import { useToast } from './ui/use-toast'
import Image from 'next/image'
import { RxCross2 } from 'react-icons/rx'
import { TailSpin } from 'react-loader-spinner'
import { imageRemove } from '@/lib/imageRemove'
import { MdAddBox } from 'react-icons/md'

export function PostCreate() {
  const [imgUrl, setImgUrl] = useState('')
  const [imgKey, setImgKey] = useState('')
  const [delLoading, setDelLoading] = useState(false)
  const [caption, setCaption] = useState('')
  // const [loading, setLoading] = useState(false)
  const { toast } = useToast()

  const handleDelete = async () => {
    setDelLoading(!delLoading)
    if (imgKey) {
      const res = await imageRemove(imgKey)
      if (res.success) {
        setDelLoading(false)
        setImgKey('')
        setImgUrl('')
      }
    }
  }

  const handleCreatePost = () => {
    if (!imgUrl) {
      toast({
        title: 'Please upload image',
        description: 'Image is required',
        variant: 'destructive'
      })
      return
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="create"
          className="w-full flex items-center justify-center md:justify-start space-x-4 px-7 md:px-4 py-6"
        >
          <span className="text-2xl">
            <MdAddBox />
          </span>
          <span className="hidden md:block text-[17px] font-normal">
            Create
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-[340px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Create Post</AlertDialogTitle>
        </AlertDialogHeader>
        <div className="w-full flex flex-col items-center justify-center">
          {imgUrl ? (
            <div className="w-full max-h-[360px] overflow-hidden relative">
              <Image
                src={imgUrl}
                alt="imgUrl-upload"
                width={200}
                height={200}
                className="w-full object-cover"
              />
              <button
                onClick={handleDelete}
                disabled={delLoading}
                className="absolute top-2 right-2 bg-slate-800 hover:bg-slate-700 rounded-full text-white p-1 text-sm font-medium"
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
            </div>
          ) : (
            <div className="w-full h-56 flex items-center justify-center border">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res: any) => {
                  setImgUrl(res[0].url)
                  setImgKey(res[0].key)
                }}
                onUploadError={(error: Error) => {
                  toast({
                    variant: 'destructive',
                    title: `${error.message}`
                  })
                }}
              />
            </div>
          )}
          <div className="w-full">
            <textarea
              name="caption"
              id="caption"
              placeholder="Add a caption..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              cols={30}
              rows={2}
              className="peer block w-full h-full resize-none p-2 text-base text-gray-700 outline-none placeholder:text-gray-500"
            />
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDelete}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleCreatePost}>Post</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
