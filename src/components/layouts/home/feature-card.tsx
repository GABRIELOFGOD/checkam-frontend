import { LucideIcon } from 'lucide-react';

const FeatureCard = ({
  label, icon: Icon
}: {
  label: string,
  icon: LucideIcon
}) => {
  return (
    <div className="p-3 rounded-md flex gap-2 border borde-border/70 bg-card text-card-foreground w-full">
      <Icon size={15} className='my-auto' />
      <p className='my-auto text-sm font-bold'>{label}</p>
    </div>
  )
}

export default FeatureCard;