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
  username: varchar('username', { length: 50 }).unique().notNull(),
  email: varchar('email', { length: 50 }).unique(),
  password: text('password').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
})

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId]
  })
}))

export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 50 }).notNull(),
  image: varchar('image', { length: 255 }),
  bio: text('bio'),
  userId: uuid('user_id')
    .notNull()
    .references(() => users.id)
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
