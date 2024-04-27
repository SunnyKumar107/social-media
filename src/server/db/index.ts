import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import * as schema from './schema'

export const db = drizzle(sql, { schema })

export const getUserTable = async () => {
  const result = await db.query.users.findMany({
    with: {
      posts: true
    }
  })
  return result
}

export const getPostTable = async () => {
  const result = await db.query.posts.findMany({
    with: {
      author: true
    }
  })
  return result
}
