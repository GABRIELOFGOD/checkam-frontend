"use client";

import { useState } from "react";
import PagesTop from "../pages-top";
import Infographics from "./infographics";
import Video from "./video";

const CivicMain = () => {
  const [civicSearch, setCivicSearch] = useState<string>("");
  
  return (
    <div className="flex flex-col gap-5 w-full">
      <PagesTop
        title='Civic Education Portal'
        short='Explore resources to understand your rights, responsibilities, and how to engage with the Osun State government.'
        searchState={civicSearch}
        searchChange={setCivicSearch  }
      />

      <Infographics />
      <Video />
    </div>
  )
}

export default CivicMain;