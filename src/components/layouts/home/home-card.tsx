import { cn } from '@/lib/utils'
import { LucideIcon } from 'lucide-react'
import React from 'react'

const HomeCard = ({
  title,
  value,
  sub,
  icon: Icon,
  className
}: {
  title: string,
  value: number | string,
  sub?: string,
  icon: LucideIcon,
  className: string
}) => {
  return (
    <div className='rounded-md shadow-sm border border-border/80 flex gap-3 w-full bg-card text-card-foreground p-5'>
      <div className={cn(className, "my-auto")} >
        <Icon size={20} />
      </div>
      <div className='my-auto'>
        <p className='text-foreground/80 text-sm font-semibold'>{title}</p>
        <p className='text-2xl font-bold'>{value}</p>
        {sub && <p className='text-sm italic text-gray-700'>{sub}</p>}
      </div>
    </div>
  )
}

export default HomeCard