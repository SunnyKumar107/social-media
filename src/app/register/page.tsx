import RegisterForm from '@/components/register-form'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

const page = async () => {
  const session = await getServerSession()
  if (session) {
    redirect('/')
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-[#f0f2f5] p-1">
      <RegisterForm />
    </div>
  )
}

export default page
