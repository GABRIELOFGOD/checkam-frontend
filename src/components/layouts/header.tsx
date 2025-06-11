import { Menu } from "lucide-react";
import Image from "next/image";

const Header = () => {
  return (
    <div>
      <div className="flex gap-5 justify-between px-3 py-2 md:px-24 shadow-sm">
        <Image
          src={"/brand/logo.png"}
          alt="Logo"
          height={50}
          width={100}
        />
        <div className="md:hidden flex my-auto">
          <Menu size={20} />
        </div>
      </div>

    </div>
  )
}

export default Header;