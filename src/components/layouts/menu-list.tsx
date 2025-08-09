"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useUser } from "@/providers/user-provider";
import { User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "../../lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MenuList = () => {
  const { isLoaded, user } = useUser();
  const router = useRouter();

  const listItems = [
    {name: "Home", href: "/"},
    {name: "Bills", href: "/bills"},
    {name: "Legislators", href: "/legislators"},
    {name: "Civic Education", href: "/civic-education"},
  ]

  const path = usePathname();
  const gotoLogin = () => {
    router.push(`/login?back=${path}`)
  }

  const logout = () => {
    localStorage.removeItem("token");
    location.reload();
  }


  
  return (
    <div className="flex gap-5 flex-col md:flex-row md:my-auto">
      {listItems.map((item, index) => (
        <Link key={index} href={item.href} className={cn("my-auto font-semibold", path === item.href ? "text-secondary" : "text-gray-700")}>
          {item.name}
        </Link>
      ))}

      <div>
        {isLoaded && !user ? (<Button
          className="ml-5"
          onClick={gotoLogin}
        >
          Get started
        </Button>) : (
          <DropdownMenu>
            <DropdownMenuTrigger className="my-auto hidden md:flex">
              <Button
                variant={"outline"}
                className="rounded-full flex items-center justify-center h-8 w-8 my-auto"
              >
                <User />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <div className="flex md:hidden flex-col">
        <Link
          href="#"
          className={cn("my-auto font-semibold", path === "/profile" ? "text-secondary" : "text-gray-700")}
        >Profile</Link>

        <div
          className="w-full absolute bottom-5 left-0 px-3"
        >
          <Button
            variant={"destructive"}
            className="w-full"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}
export default MenuList;