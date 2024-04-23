import { drizzle } from 'drizzle-orm/vercel-postgres'
import { sql } from '@vercel/postgres'
import { postsTable, users } from './schema'

export const db = drizzle(sql)

async function main() {
  const user = await db.insert(users).values({
    name: 'John Smith',
    username: 'johnsmith',
    email: 'johnsmith@gmail.com',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFI7IEnwfKvQdc9fYsYRmi1sLRPRhVgwk1qLWrEesvGg&s'
  })
  console.log('user', user)
  const post = await db.insert(postsTable).values({
    caption: 'This is my second post.',
    userId: '1ffbdbd1-754c-461e-a767-f263269ff781',
    image:
      'https://images.unsplash.com/photo-1610085927744-7217728267a6?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZnVsbCUyMGhkJTIwd2FsbHBhcGVyfGVufDB8fDB8fHww'
  })
  console.log('post', post)
}
// main()

export const getUserTable = async () => {
  const allUsers = await db.select().from(users)
  return allUsers
}

export const getPostTable = async () => {
  const posts = await db.select().from(postsTable)
  return posts
}

export const createUser = async (
  name: string,
  username: string,
  email: string,
  image: string
) => {
  await db.insert(users).values({
    name: name,
    username: username,
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
