export type PostParams = {
  id: string
  caption?: string
  authorId: string
  img: string
  likes: number
  createdAt: object
  author: User
}

export type User = {
  id: string
  email: string
  username: string
  name: string
  img?: string
  bio?: string
  password: string
  createdAt: object
}
