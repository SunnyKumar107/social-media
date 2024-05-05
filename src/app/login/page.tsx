import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import LoginForm from '../../components/login-form'

export default async function LoginPage() {
  const session = await getServerSession()
  if (session) {
    redirect('/')
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#f0f2f5] p-2">
      <LoginForm />
    </div>
  )
}
