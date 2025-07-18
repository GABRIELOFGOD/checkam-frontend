import Link from "next/link";
import { Button } from "../ui/button";

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
        <Button>Get started</Button>
      </div>
    </div>
  )
}
export default MenuList;