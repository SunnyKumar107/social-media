'use server'

import { utapi } from '@/server/uploadthing'

export const imageRemove = async (imgKey: string) => {
  console.log('remove', imgKey)
  try {
    await utapi.deleteFiles(imgKey)
    return { success: true }
  } catch (error: any) {
    return { success: false }
  }
}
