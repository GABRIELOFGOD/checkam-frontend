"use client";

import { useState } from "react";
import PagesTop from "../pages-top";
import Infographics from "./infographics";
import InfographArticles from "./infograph-articles";

const CivicMain = () => {
  const [civicSearch, setCivicSearch] = useState<string>("");
  
  return (
    <div className="flex flex-col gap-5 w-full">
      <PagesTop
        title='Civic Education Portal'
        short='Learn how the government works and how you can take part in it. When you know your rights and responsibilities, you can make better decisions and hold your leaders accountable.'
        searchState={civicSearch}
        searchChange={setCivicSearch  }
      />

      <InfographArticles />
      <Infographics />
      {/* <Video /> */}
    </div>
  )
}

export default CivicMain;