"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useUser } from "@/providers/user-provider";
import { User } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

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
  
  return (
    <div className="flex gap-5 flex-col md:flex-row md:my-auto">
      {listItems.map((item, index) => (
        <Link key={index} href={item.href} className="text-gray-700 my-auto font-semibold">
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
          <Button
            variant={"outline"}
            className="rounded-full flex items-center justify-center h-8 w-8 my-auto"
          >
            <User />
          </Button>
        )}
      </div>
    </div>
  )
}
export default MenuList;