import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUser } from './db'
const bcrypt = require('bcrypt')

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: any): Promise<any> {
        try {
          const user = await getUser(credentials?.email)
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials?.password,
              user?.passwordHash
            )
            if (isPasswordCorrect) {
              return user
            }
          }
        } catch (error: Error | any) {
          throw new Error(error)
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      //pass in user id, username and img to token
      if (user) {
        return {
          ...token,
          id: user.id,
          username: user.username,
          img: user.img
        }
      }
      return token
    },
    async session({ session, token }) {
      //pass in user id, username and img to session
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          username: token.username,
          img: token.img
        }
      }
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}
