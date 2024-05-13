'use client'

import { UploadButton } from '@/utils/uploadthing'
import { useEffect, useState } from 'react'
import { useToast } from './ui/use-toast'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { FaArrowLeft } from 'react-icons/fa'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { RxCross2 } from 'react-icons/rx'
import { TailSpin } from 'react-loader-spinner'
import { imageRemove } from '@/lib/imageRemove'

const EditProfile = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null)
  const [imgKey, setImgKey] = useState('')
  const [fullName, setFullName] = useState('')
  const [username, serUsername] = useState('')
  const [bio, setBio] = useState('')
  const [delLoading, setDelLoading] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      setImgUrl(session.user.img)
      setFullName(session.user.name as string)
      serUsername(session.user.username)
      setBio(session.user.bio)
    }
  }, [session, router])

  const handleDelete = async () => {
    setDelLoading(!delLoading)
    if (imgKey) {
      const res = await imageRemove(imgKey)
      if (res.success) {
        setDelLoading(false)
        setImgKey('')
        setImgUrl(null)
      }
    } else {
      setDelLoading(false)
      setImgUrl(null)
    }
  }

  return (
    <div className="w-full h-full md:max-w-[600px] bg-white relative z-20 px-4">
      <div className="w-full flex items-center py-6">
        <h1 className="flex items-center text-xl font-medium">
          <Link href="/profile" className="md:hidden mr-4">
            <FaArrowLeft />
          </Link>{' '}
          Edit Profile
        </h1>
      </div>
      <div className="flex items-center justify-between p-4 border bg-gray-50 rounded-lg mb-4">
        <div className="relative">
          <div className="w-20 h-20 bg-gray-200 rounded-full overflow-hidden">
            <Image
              src={
                imgUrl
                  ? imgUrl
                  : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png'
              }
              alt="profile"
              width={100}
              height={100}
              className="min-h-20 object-cover"
            />
          </div>
          {imgUrl && (
            <button
              onClick={handleDelete}
              disabled={delLoading}
              className="absolute top-[-8px] right-[-8px] bg-slate-800 hover:bg-slate-700 rounded-full text-white p-1 text-sm font-medium"
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
          )}
        </div>
        <div>
          <UploadButton
            endpoint="imageUploader"
            onUploadBegin={handleDelete}
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
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
        />
        <Label className="mb-4 px-3">Username</Label>
        <Input
          className="mb-4"
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => serUsername(e.target.value)}
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
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          required
        />
      </div>
      <div className="">
        <Button className="float-right">Submit</Button>
      </div>
    </div>
  )
}

export default EditProfile
