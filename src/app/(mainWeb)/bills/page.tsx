import Bills from '@/components/layouts/bills/bills';
import React from 'react'

const BillsPage = () => {
  
  return (
    <div className='px-3 md:px-0'>
      <div className='py-10 md:py-20 container mx-auto flex flex-col gap-10 md:gap-20'>
        {/* <div className="flex gap-2 flex-col">
          <p className='text-2xl md:text-4xl font-extrabold'>Bills</p>
          <p className='text-muted text-sm'>Track the progress of bills in the Osun State House of Assembly</p>
        </div> */}
        
        <Bills />
      </div>
    </div>
  )
}

export default BillsPage;