export type TypePost = {
  id: string
  caption: string
  userId: string
  image: string
  likes: number
  createdAt: Date
}

export type User = {
  id: string,
  username: string,
  email: string,
  password: string,
  createdAt: Date
}