import Link from "next/link";
import { Button } from "../ui/button";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const MenuList = () => {
  const listItems = [
    {name: "Home", href: "/"},
    {name: "Bills", href: "/bills"},
    {name: "Legislators", href: "/legislators"},
    {name: "Civic Education", href: "/civic-education"},
  ]
  
  return (
    <div className="flex gap-5 flex-col md:flex-row md:my-auto">
      {listItems.map((item, index) => (
        <Link key={index} href={item.href} className="text-gray-700 my-auto font-semibold">
          {item.name}
        </Link>
      ))}

      <div>
        <SignedOut>
          <SignInButton />
          <SignUpButton>
            <Button
              className="ml-5"
            >
              <Link href={"/register"}>
                Get started
              </Link>
            </Button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  )
}
export default MenuList;