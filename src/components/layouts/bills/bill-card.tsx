import { Button } from '@/components/ui/button';
import { BillType } from '@/data/bills';
import { Download } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const BillCard = ({ bill }: { bill: BillType }) => {

  // TODO: For production
  // const handleDownload = async () => {
  //   const fileUrl = 'https://example.com/bill.pdf';
  //   const response = await fetch(fileUrl);
  //   const blob = await response.blob();
  //   const url = window.URL.createObjectURL(blob);

  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = 'Your_Bill.pdf';
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  //   window.URL.revokeObjectURL(url);
  // };

  const handleDownload = () => {
    const fileUrl = '/documents/example.pdf'; // For dev: in public folder; For prod: replace with full URL
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'Your_Bill.pdf'; // suggested file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className='flex flex-col md:flex-row gap-5 w-full h-fit'>
      <div className='md:h-[256px] h-[220px] w-full md:w-[464px] rounded-md overflow-hidden relative bg-muted/20 my-auto'>
        <Image
          src={bill.image || "/brand/checkam_logo.png"}
          alt='Bill image'
          fill
          className='h-full w-full md:object-cover object-contain'
        />
      </div>
      
      <div className='w-full my-auto flex flex-col gap-2'>
        <p className='text-xl md:text-2xl font-bold'>{bill.title}</p>
        <div>
          <p className='italic font-semibold text-foreground/80'>Bill in Summary</p>
          <p className='text-sm text-muted'>{bill.summary}</p>
        </div>
        <div className="flex justify-between mt-2">
          <div className="flex gap-3">
            <div className="rounded-full border border-border py-1 px-3 bg-accent text-accent-foreground text-sm font-semibold italic capitalize">{bill.category}</div>
            <div className="rounded-full border border-border py-1 px-3 bg-accent text-accent-foreground text-sm font-semibold italic capitalize">{bill.stage}</div>
          </div>

          <Button
            onClick={handleDownload}
          >
            <Download className='my-auto' size={15} />
            <p className="my-auto">Download Bill</p>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default BillCard;