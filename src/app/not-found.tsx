import Image from "next/image";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex h-screen w-full justify-center items-center flex-col">
      <div className="mb-10">
        <Image
          src={"/brand/checkam_logo.png"}
          alt="Logo"
          width={200}
          height={200}
        />
      </div>
      <h1 className="text-2xl font-bold text-center">This papge does not exist or has been removed</h1>
      <p className="text-center text-gray-600">Go back to <Link href="/" className="text-primary hover:underline duration-100 ease-in-out">Checkam! Home Page</Link></p>
    </div>
  )
}
export default PageNotFound;