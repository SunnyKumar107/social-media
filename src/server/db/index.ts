import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import * as schema from './schema'
import { eq } from 'drizzle-orm'

export const db = drizzle(sql, { schema })

export const getUserTable = async () => {
  const result = await db.query.users.findMany({
    columns: {
      email: true,
      username: true,
      name: true,
      img: true,
      bio: true,
      id: true
    },
    with: {
      posts: true
    }
  })
  return result
}

export const getUser = async (email: string) => {
  const result: {
    id: string
    name: string
    email: string
    username: string
    img: string | null
    bio: string | null
    passwordHash: string
    createdAt: Date
    updatedAt: Date
  }[] = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.email, email))
  return result[0]
}

export const getPostTable = async () => {
  const result = await db.query.posts.findMany({
    with: {
      author: true,
      comments: true,
      likes: true
    }
  })
  return result
}

export const getCommentsTable = async () => {
  const result = await db.query.comments.findMany({
    with: {
      author: true
    }
  })
  return result
}
