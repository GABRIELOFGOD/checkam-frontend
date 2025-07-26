import Image from "next/image";

const LogoBackGround = ({ className }: { className?: string }) => {
  return (
    <div className={cn("h-full w-full absolute flex items-center justify-center opacity-50")}>
      <Image
        src={"/brand/checkam_logo.png"}
        alt="Logo"
        fill
        className="object-contain"
      />
    </div>
  )
}
export default LogoBackGround;