'use server'

import { eq } from 'drizzle-orm'
import { db } from '.'
import { posts, users, comments, likes } from './schema'
import bcrypt from 'bcrypt'

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

export const addComment = async (
  postId: string,
  authorId: string,
  comment: string
) => {
  await db.insert(comments).values({
    postId: postId,
    authorId: authorId,
    comment: comment
  })
  console.log('Comment added')
}
