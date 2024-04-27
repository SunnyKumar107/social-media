import { db } from '.'
import { posts, users } from './schema'

export const createUser = async (
  email: string,
  username: string,
  name: string,
  passwordHash: string
) => {
  await db.insert(users).values({
    username: username,
    email: email,
    name: name,
    passwordHash: passwordHash
  })
  console.log('user created')
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
