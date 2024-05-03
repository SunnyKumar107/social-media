import { eq } from 'drizzle-orm'
import { db } from '.'
import { posts, users } from './schema'
const bcrypt = require('bcrypt')

export const createUser = async (
  email: string,
  username: string,
  name: string,
  password: string,
  img?: string | null,
  bio?: string
) => {
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
  if (!isEmailExist.length) {
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
  if (!isUsernameExist.length) {
    return {
      success: false,
      message: 'username already exist',
      statuscode: 400
    }
  }
  const passwordHash = await bcrypt.hash(password, 10)

  const newUser = await db.insert(users).values({
    username: username,
    email: email,
    name: name,
    passwordHash: passwordHash,
    img: img,
    bio: bio
  })
  console.log('user created', newUser)
  return {
    success: true,
    message: 'user created',
    statuscode: 200,
    data: newUser
  }
}

export const createPost = async (
  caption: string,
  authorId: string,
  img: string
) => {
  await db.insert(posts).values({
    caption: caption,
    authorId: authorId,
    img: img
  })
  console.log('post created')
}
