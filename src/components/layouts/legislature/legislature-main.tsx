"use client";

import React, { useEffect, useState } from 'react'
import PagesTop from '../pages-top';
import LegislatorMapper from './legislator-mapper';
import { legislators, LegislatorType } from '@/data/legislator';

const LegislatureMain = () => {
  const [legislatureSearch, setLegislatureSearch] = useState<string>("");
  const [allLegislatures, setAllLegislatures] = useState<LegislatorType[]>([]);

  useEffect(() => {
    setAllLegislatures(legislators);
  }, []);
  
  return (
    <div className="flex flex-col gap-5">
      <PagesTop
        title='Legislature'
        short='Meet the representatives shaping the future of Osun State. Explore their profiles, track their performance, and engage with their work.'
        searchState={legislatureSearch}
        searchChange={setLegislatureSearch}
      />

      <LegislatorMapper legislators={allLegislatures} />
    </div>
  )
}

export default LegislatureMain;