import { ReactNode } from "react";
import { Button } from "./ui/button";

export interface ContentCardType {
  title: string;
  content: ReactNode | string;
  button?: {
    text: string;
    onButtonClick: () => void;
  };
  comp?: ReactNode;
}

const ContentCard = ({ title, content, button, comp }: ContentCardType) => {
  return (
    <div className="rounded-md border-2 border-border shadow-sm w-full overflow-hidden">
      <div className="bg-primary py-1 border-b-2 border-border flex justify-between px-3">
        <h2 className="text-lg font-bold my-auto text-white">{title}</h2>
        {button && (<Button size={"sm"} variant={"outline"} onClick={button.onButtonClick}>{button.text}</Button>)}
        {comp && (comp)}
      </div>
      <div className="p-3 h-[300px] w-full overflow-y-auto">{content}</div>
    </div>
  )
}
export default ContentCard;