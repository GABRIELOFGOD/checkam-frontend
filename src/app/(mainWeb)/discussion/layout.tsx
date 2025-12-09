// import CreateDiscussionButton from "@/components/layouts/discussion/create-discussion-button";
// import DiscussionDisplay from "@/components/layouts/discussion/discussion-display";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Discussion - Checkam!",
  description: "Join the conversation on Checkam! Share your thoughts, ideas, and feedback with our community. Engage in meaningful discussions and connect with others who share your interests.",
}

const Discussion = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-[95%] md:w-[75%] lg:w-full lg:px-10 mx-auto py-10 md:h-[85vh] over-hidden relative">
      <div className="h-full overflow-y-auto">
        <div className="flex w-full md:gap-5 h-full relative">
              <div className="lg:flex flex-col p-5 hidden w-[25%]"></div>
              {/* <div> */}
                {children}
              {/* </div> */}
              <div className="lg:flex flex-col p-5 hidden w-[25%]"></div>
            </div>
      </div>
    </div>
  )
}
export default Discussion;