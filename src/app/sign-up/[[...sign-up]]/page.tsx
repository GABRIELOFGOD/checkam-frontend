import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center flex-col w-full h-screen'>
      <SignUp />
    </div>
  )
}