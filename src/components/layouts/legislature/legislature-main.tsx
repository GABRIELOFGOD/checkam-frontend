"use client";

import React, { useEffect, useState } from 'react'
import PagesTop from '../pages-top';
import LegislatorMapper from './legislator-mapper';
import { toast } from 'sonner';
import Loading from '@/components/general-loader';
import { IUser } from '@/models/user';

const LegislatureMain = () => {
  const [legislatureSearch, setLegislatureSearch] = useState<string>("");
  const [allLegislatures, setAllLegislatures] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchLegislators = async () => {
    try {
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed to fetch legislators');
      const data = await res.json();
      setAllLegislatures(data.filter((user: IUser) => user.role === 'legislator'));
    } catch (error) {
      toast.error("Error getting legislators data, Please reload");
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchLegislators();
  }, []);

  if (isLoading) {
    return (
      <div className='h-screen w-full flex justify-center items-center left-0 top-0'>
        <Loading />
      </div>
    )
  }
  
  return (
    <div className="flex flex-col gap-5">
      <PagesTop
        title='Legislators'
        short='Meet the representatives shaping the future of Osun State. Explore their profiles, track their performance, and engage with their work.'
        searchState={legislatureSearch}
        searchChange={setLegislatureSearch}
        image='/images/legislators.heic'
      />

      <LegislatorMapper legislators={allLegislatures} />
    </div>
  )
}

export default LegislatureMain;