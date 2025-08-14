import { BookOpenText, BriefcaseBusiness, File, Megaphone, Trophy, User } from "lucide-react";
import FeatureCard from "./feature-card";

const WebFeatures = () => {
  const features = [
    {
      label: "Bill Traker",
      icon: File,
      className: "border-purple-500/30 shadow-sm shadow-purple-500/30"
    },
    {
      label: "Legislator Progress",
      icon: User,
      className: "border-yellow-500/30 shadow-sm shadow-yellow-500/30"
    },
    {
      label: "Feedback Hub",
      icon: Megaphone,
      className: "border-blue-500/30 shadow-sm shadow-blue-500/30"
    },
    {
      label: "Civic Education",
      icon: BookOpenText,
      className: "border-red-500/30 shadow-sm shadow-red-500/30"
    },
    {
      label: "Workspace",
      icon: BriefcaseBusiness,
      className: "border-green-500/30 shadow-sm shadow-green-500/30"
    },
    {
      label: "LeaderBoard",
      icon: Trophy,
      className: "border-teal-500/30 shadow-sm shadow-teal-500/30"
    },
  ]
  
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {features.map((item, i) => (
        <FeatureCard
          key={i}
          label={item.label}
          icon={item.icon}
          className={item.className}
        />
      ))}
    </div>
  )
}

export default WebFeatures;