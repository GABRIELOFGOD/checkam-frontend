import { File, Hospital, LucideInspect, User } from "lucide-react";
import HomeCard from "./home-card";

const CardSection = () => {
  const cards = [
    {
      id: 1,
      title: "Bills Tracked",
      value: "1,250+",
      sub: "Stay informed on the laws being made.",
      icon: File,
      className: "rounded-full bg-red-500/20 text-red-500/80 p-2"
    },
    {
      id: 2,
      title: "Youth Engaged",
      value: "8,570+",
      sub: "Join others taking action.",
      icon: User,
      className: "rounded-full bg-blue-500/20 text-blue-500/80 p-2"
    },
    {
      id: 2,
      title: "Legislators monitored",
      value: "220+",
      sub: "Know who represents you.",
      icon: LucideInspect,
      className: "rounded-full bg-green-500/20 text-green-500/80 p-2"
    },
    {
      id: 2,
      title: "Civic Actions Taken",
      value: "1,050",
      sub: "Be part of the change.",
      icon: Hospital,
      className: "rounded-full bg-yellow-500/20 text-yellow-500/80 p-2"
    },
  ]
  
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {cards.map((item) => (
        <HomeCard
          key={item.id}
          title={item.title}
          value={item.value}
          sub={item.sub}
          icon={item.icon}
          className={item.className}
        />
      ))}
    </div>
  )
}

export default CardSection;