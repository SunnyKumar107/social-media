import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

export const db = drizzle(sql)

export const postsTable = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  caption: text('caption').notNull(),
  profileId: uuid('profile_id').notNull(),
  imageUrl: text('image_url').notNull(),
  likes: integer('likes').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const getPostTable = async () => {
  const posts = await db.select().from(postsTable)
  return posts
}
