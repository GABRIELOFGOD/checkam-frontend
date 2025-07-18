import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MenuList from "./menu-list";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  return (
    <div className="w-full shadow-sm bg-white fixed top-0 z-50">
      <div className="flex gap-5 justify-between py-2  container mx-auto items-center">
        <Link
          href="/"
        >
          <Image
            src={"/brand/logo.png"}
            alt="Logo"
            height={50}
            width={100}
          />
        </Link>
        <div className="md:hidden flex my-auto">
          
          <Sheet>
            <SheetTrigger>
              <Menu size={20} />
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>
                  <Image
                    src={"/brand/logo.png"}
                    alt="Logo"
                    height={50}
                    width={100}
                  />
                </SheetTitle>
                <SheetDescription>
                  <MenuList />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="hidden md:flex"><MenuList /></div>
      </div>

    </div>
  )
}

export default Header;