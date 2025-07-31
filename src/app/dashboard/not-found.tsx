import Image from "next/image";
import Link from "next/link";

const PageNotFound = () => {
  return (
    <div className="flex h-full w-full justify-center items-center flex-col">
      <div className="mb-10">
        <Image
          src={"/brand/checkam_logo.png"}
          alt="Logo"
          width={200}
          height={200}
        />
      </div>
      <h1 className="text-2xl font-bold text-center">Comrade wetin you dey find?</h1>
      <p className="text-center text-gray-600">He be like say you don miss road oo! Oya turn <Link href="/dashboard" className="text-primary hover:underline duration-100 ease-in-out">Oya turn</Link></p>
    </div>
  )
}
export default PageNotFound;