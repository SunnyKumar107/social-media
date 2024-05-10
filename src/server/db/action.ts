'use server'

import { eq } from 'drizzle-orm'
import { db } from '.'
import { posts, users, comments, likes } from './schema'
import bcrypt from 'bcrypt'
import { revalidateTag } from 'next/cache'

export const createUser = async (userData: any) => {
  try {
    const { email, username, name, password, imgUrl, bio } = userData
    if (!email || !username || !name || !password) {
      return {
        success: false,
        message: 'all fields are required',
        statuscode: 400
      }
    }

    const isEmailExist = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
    if (isEmailExist.length) {
      return {
        success: false,
        message: 'email already exist',
        statuscode: 400
      }
    }

    const isUsernameExist = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
    if (isUsernameExist.length) {
      return {
        success: false,
        message: 'username already exist',
        statuscode: 400
      }
    }
    const passwordHash = await bcrypt.hash(password, 10)

    await db.insert(users).values({
      username: username,
      email: email,
      name: name,
      passwordHash: passwordHash,
      img: imgUrl,
      bio: bio
    })
    return {
      success: true,
      message: 'user created',
      statuscode: 200
    }
  } catch (error) {
    return {
      success: false,
      message: 'server error',
      statuscode: 500
    }
  }
}

export const deleteUser = async (email: string) => {
  try {
    await db.delete(users).where(eq(users.email, email))
    return {
      success: true,
      message: 'user deleted',
      statuscode: 200
    }
  } catch (error) {
    return {
      success: false,
      message: 'server error',
      statuscode: 500
    }
  }
}

export const createPost = async ({
  caption,
  authorId,
  img
}: {
  caption?: string
  authorId: string
  img: string
}) => {
  try {
    await db.insert(posts).values({
      caption: caption,
      authorId: authorId,
      img: img
    })
    revalidateTag('/')
    revalidateTag('/profile')
    return {
      success: true,
      message: 'post created',
      statuscode: 200
    }
  } catch (error) {
    return {
      success: false,
      message: 'server error',
      statuscode: 500
    }
  }
}

export const addComment = async ({
  postId,
  authorId,
  comment
}: {
  postId: string
  authorId: string
  comment: string
}) => {
  try {
    await db.insert(comments).values({
      postId: postId,
      authorId: authorId,
      comment: comment
    })
    revalidateTag('/')

    return {
      success: true,
      message: 'comment added',
      statuscode: 200
    }
  } catch (error) {
    return {
      success: false,
      message: 'server error',
      statuscode: 500
    }
  }
}

export const addLike = async ({
  postId,
  authorId
}: {
  postId: string
  authorId: string
}) => {
  try {
    await db.insert(likes).values({
      postId: postId,
      authorId: authorId
    })
    revalidateTag('/')
    return {
      success: true,
      message: 'like added',
      statuscode: 200
    }
  } catch (error) {
    return {
      success: false,
      message: 'server error',
      statuscode: 500
    }
  }
}

export const deleteLike = async (authorId: string) => {
  try {
    await db.delete(likes).where(eq(likes.authorId, authorId))
    revalidateTag('/')
    return {
      success: true,
      message: 'like deleted',
      statuscode: 200
    }
  } catch (error) {
    return {
      success: false,
      message: 'server error',
      statuscode: 500
    }
  }
}
