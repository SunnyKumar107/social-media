import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { posts, users } from './schema'

export const db = drizzle(sql)

export const getUserTable = async () => {
  const result = await db.select().from(users)
  // const result = await db.query.users.findFirst({
  //   with: {
  //     profile: true
  //   }
  // })
  console.log(result)
  return result
}
getUserTable()

export const getPostTable = async () => {
  const result = await db.select().from(posts)
  return result
}

export const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  await db.insert(users).values({
    username: username,
    email: email,
    password: password
  })
}

export const createPost = async (
  caption: string,
  userId: string,
  image: string
) => {
  await db.insert(posts).values({
    caption: caption,
    userId: userId,
    image: image
  })
}
