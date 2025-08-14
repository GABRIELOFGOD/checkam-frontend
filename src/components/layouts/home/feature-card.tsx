import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

const FeatureCard = ({
  label, icon: Icon, className
}: {
  label: string,
  icon: LucideIcon,
  className?: string
}) => {
  return (
    <div className={cn("p-3 rounded-md flex gap-2 border bg-card text-card-foreground w-full", className)}>
      <Icon size={15} className='my-auto' />
      <p className='my-auto text-sm font-bold'>{label}</p>
    </div>
  )
}

export default FeatureCard;