export const authenticate = async (
  prevState: string | undefined,
  formData: FormData
) => {
  console.log('authenticate')
  try {
    const email = formData.get('email')
    const password = formData.get('password')
    console.log('login with', email, password)
  } catch (error) {
    console.log('error:', error)
    return 'some error happend'
  }
}
