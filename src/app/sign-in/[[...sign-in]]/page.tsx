import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='flex justify-center items-center flex-col w-full h-screen'>
      <SignIn />
    </div>
  )
}