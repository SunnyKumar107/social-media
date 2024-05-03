import { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getUser } from './db'
import bcrypt from 'bcrypt'

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
  ]
}
