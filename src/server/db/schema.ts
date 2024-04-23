import { relations } from 'drizzle-orm'
import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  username: varchar('username', { length: 50 }).unique().notNull(),
  email: varchar('email', { length: 50 }).unique(),
  image: varchar('image', { length: 255 }),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const postsTable = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  caption: text('caption').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id),
  image: varchar('image', { length: 255 }).notNull(),
  likes: integer('likes').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})
