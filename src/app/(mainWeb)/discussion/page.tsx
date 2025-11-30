// import CreateDiscussionButton from "@/components/layouts/discussion/create-discussion-button";
import DiscussionDisplay from "@/components/layouts/discussion/discussion-display";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discussion - Checkam!",
  description: "Join the conversation on Checkam! Share your thoughts, ideas, and feedback with our community. Engage in meaningful discussions and connect with others who share your interests.",
}

const Discussion = () => {
  return (
    <div className="w-[90%] md:w-[75%] lg:w-full lg:px-10 mx-auto py-10 h-[90vh] over-hidden relative">
      <div className="h-full overflow-y-auto">
        <DiscussionDisplay />
      </div>
    </div>
  )
}
export default Discussion;