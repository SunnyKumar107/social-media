'use client'

import { UploadButton } from '@/utils/uploadthing'
import { useState } from 'react'
import { useToast } from './ui/use-toast'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { FaArrowLeft } from 'react-icons/fa'

const EditProfile = () => {
  const [imgUrl, setImgUrl] = useState('')
  const [imgKey, setImgKey] = useState('')
  const { toast } = useToast()
  return (
    <div className="w-full h-full md:w-[600px] bg-white p-4">
      <div className="mb-4 py-4">
        <h1 className="flex items-center text-xl font-semibold">
          <span className="md:hidden mr-4">
            <FaArrowLeft />
          </span>{' '}
          Edit Profile
        </h1>
      </div>
      <div className="flex items-center justify-between p-4 border bg-gray-50 rounded-lg mb-4">
        <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
        <div>
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={(res: any) => {
              setImgUrl(res[0].url)
              setImgKey(res[0].key)
            }}
            onUploadError={(error: Error) => {
              toast({
                variant: 'destructive',
                title: 'Image upload failed!',
                description: 'Image size is too big. Max size is 4MB'
              })
            }}
          />
        </div>
      </div>
      <div className="w-full">
        <Label className="mb-4 px-3">Name</Label>
        <Input
          className="mb-4"
          id="fullname"
          type="text"
          name="fullname"
          placeholder="Full Name"
          required
        />
        <Label className="mb-4 px-3">Username</Label>
        <Input
          className="mb-4"
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          required
        />
        <Label className="mb-4 px-3">Bio</Label>
        <Textarea
          className="mb-4 resize-none"
          id="Bio"
          name="Bio"
          placeholder="Bio"
          rows={2}
          cols={20}
          required
        />
      </div>
      <Button className="float-right">Submit</Button>
    </div>
  )
}

export default EditProfile
