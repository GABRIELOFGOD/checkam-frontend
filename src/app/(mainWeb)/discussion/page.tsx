import CreateDiscussionButton from "@/components/layouts/discussion/create-discussion-button";

const Discussion = () => {
  return (
    <div className="container mx-auto py-10 h-[90vh] bg-orange-500 over-hidden relative">
      <div className="h-full overflow-y-auto">


        <CreateDiscussionButton />
      </div>
    </div>
  )
}
export default Discussion;