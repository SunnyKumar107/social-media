import { relations } from 'drizzle-orm'
import {
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  integer
} from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 50 }).unique().notNull(),
  username: varchar('username', { length: 50 }).unique().notNull(),
  name: varchar('name', { length: 50 }).notNull(),
  img: varchar('img', { length: 255 }),
  bio: text('bio'),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}))

export const posts = pgTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  caption: text('caption').notNull(),
  authorId: uuid('author_id')
    .notNull()
    .references(() => users.id),
  img: varchar('img', { length: 255 }).notNull(),
  likes: integer('likes').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const postsRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  })
}))
