import React from 'react'

const HomeCard = ({
  title,
  value
}: {
  title: string,
  value: number
}) => {
  return (
    <div className='rounded-md shadow-sm border border-border/80 flex flex-col gap-3 w-full bg-card text-card-foreground p-5'>
      <p className='text-foreground/80 text-sm font-semibold'>{title}</p>
      <p className='text-2xl font-bold'>{value}</p>
    </div>
  )
}

export default HomeCard