"use client";

import { IDiscussionType } from "@/models/discussions";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type DiscussionType = {
 discussion: IDiscussionType | null;
 setDiscussion: Dispatch<SetStateAction<IDiscussionType | null>>
}

const DiscussionContext = createContext<DiscussionType | undefined>(undefined);

type DiscussionTypeProps = {
  children: ReactNode;
}

export const DiscussionProvider: React.FC<DiscussionTypeProps> = ({ children }) => {
  const [discussion, setDiscussion] = useState<IDiscussionType | null>(null);
  
  return (
    <DiscussionContext.Provider
      value={{
        discussion, setDiscussion
      }}
      
    >
      {children}
    </DiscussionContext.Provider>
  )
}

export const useDiscussionContext = () => {
  const context = useContext(DiscussionContext);
  if (context === undefined) throw new Error("Context must be used with the provider");
  return context;
}