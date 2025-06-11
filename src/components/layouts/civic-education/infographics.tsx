"use client";

import { infographics, InfographicType } from "@/data/infographics";
import { useEffect, useState } from "react";
import InfoCard from "./info-card";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";


const Infographics = () => {
  const [infographs, setInfographs] = useState<InfographicType[]>([]);

  useEffect(() => {
    setInfographs(infographics);
  }, []);
  
  return (
    <div className='flex flex-col gap-5 w-full'>
      <p className='text-[22px] font-bold'>Infographics</p>
      <div className="w-full gap-5">
        {!infographs.length ?
        (<div className="w-full h-[200px] flex flex-col items-center justify-center">
          <p className="text-lg font-semibold italic text-gray-400 text-center">No Infographics</p>
        </div>):
        (<div className="w-full overflow-x-auto flex gap-5">
          {infographs.map((info, i) => (
            <InfoCard
              key={i}
              info={info}
            />
          ))}
        </div>)}
      </div>
      {infographs.length > 0 && (<div className="flex gap-5 w-full justify-end">
        <Button>
          <Share2 size={15} />
          Share
        </Button>
      </div>)}
    </div>
  )
}

export default Infographics;