import { Button } from "@/components/ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    // <div className="h-fit md:h-[90vh] w-full flex justify-center items-center flex-col gap-5 md:py-20 py-40 bg-radial from-secondary/50 to-secondary/90 text-white px-5 md:px-20">
    //   <div className="flex flex-col gap-2 text-center">
    //     <p className="md:text-5xl text-3xl font-bold text-shadow-sm">Track Bills. Engage Legislature. Own Your Future.</p>
    //     <p className=" text-gray-100">Stay informed and participate in legislative process. Checkam! empowers youths in Osun state to shape their future.</p>
    //   </div>
    //   <Button
    //     size={"lg"}
    //     className="shadow-md"
    //   >Join Now!</Button>
    // </div>
    <div className="md:h-[90vh] h-[80vh] w-full md:overflow-hidden">
      <div className="flex flex-col md:flex-row h-full relative">
        <div className="flex-[3] h-full w-full relative">
          <Image
            src="/images/osun2.webp"
            alt="Hero image"
            layout="fill"
            objectFit="object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="h-fit md:h-[70vh] md:rounded-xl right-0 w-full justify-center md:w-[500px] flex flex-col gap-5 bg-primary text-white p-10 md:absolute relative animate-bounce/30 my-auto md:top-1/8">
            <p className="text-secondary font-semibold">Engaging citizens in government in Osun State</p>
            <div className="flex flex-col gap-2">
              <p className="md:text-5xl text-3xl font-bold text-shadow-sm">Track Bills. Engage Legislature. Own Your Future.</p>
              <p className=" text-gray-100">Stay informed and participate in legislative process. Checkam! empowers youths in Osun state to shape their future.</p>
            </div>
            <Button
              size={"lg"}
              className="shadow-md bg-secondary w-fit hover:bg-secondary/80"
            >Join Now!</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Hero;