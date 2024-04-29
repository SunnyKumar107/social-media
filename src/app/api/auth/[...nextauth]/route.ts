import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import { getUser } from '@/server/db'

export const authOptions: any = {
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
        } catch (error: any) {
          throw new Error(error)
        }
      }
    })
  ]
}

export const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
