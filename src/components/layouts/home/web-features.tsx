import { BookOpenText, BriefcaseBusiness, File, Megaphone, Trophy, User } from "lucide-react";
import FeatureCard from "./feature-card";

const WebFeatures = () => {
  const features = [
    {
      label: "Bill Traker",
      icon: File
    },
    {
      label: "Legislator Progress",
      icon: User
    },
    {
      label: "Feedback Hub",
      icon: Megaphone
    },
    {
      label: "Civic Education",
      icon: BookOpenText
    },
    {
      label: "Workspace",
      icon: BriefcaseBusiness
    },
    {
      label: "LeaderBoard",
      icon: Trophy
    },
  ]
  
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
      {features.map((item, i) => (
        <FeatureCard
          key={i}
          label={item.label}
          icon={item.icon}
        />
      ))}
    </div>
  )
}

export default WebFeatures;