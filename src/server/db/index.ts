import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { postsTable, users } from './schema'

export const db = drizzle(sql)

export const getPostTable = async () => {
  const posts = await db.select().from(postsTable)
  return posts
}

export const createUser = async (
  name: string,
  email: string,
  image: string
) => {
  await db.insert(users).values({
    name: name,
    email: email,
    image: image
  })
}

export const createPost = async (
  caption: string,
  userId: string,
  image: string
) => {
  await db.insert(postsTable).values({
    caption: caption,
    userId: userId,
    image: image
  })
}
