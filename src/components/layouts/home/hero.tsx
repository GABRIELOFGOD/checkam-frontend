import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="h-fit md:h-[90vh] w-full flex justify-center items-center flex-col gap-5 md:py-20 py-40 bg-radial from-secondary/50 to-secondary/90 text-white px-5 md:px-20">
      <div className="flex flex-col gap-2 text-center">
        <p className="md:text-5xl text-3xl font-bold text-shadow-sm">Track Bills. Engage Legislature. Own Your Future.</p>
        <p className=" text-gray-100">Stay informed and participate in legislative process. Checkam! empowers youths in Osun state to shape their future.</p>
      </div>
      <Button
        size={"lg"}
        className="shadow-md"
      >Join Now!</Button>
    </div>
  )
}

export default Hero;