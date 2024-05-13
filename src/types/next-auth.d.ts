import 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    username: string
    img: string
    bio: string
  }
  interface Session {
    user: User
  }
}
