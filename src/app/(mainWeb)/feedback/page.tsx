import FeedbackForm from "@/components/layouts/feedback/feed-back-form";

const Feedback = () => {
  return (
    <div className='px-3 md:px-0'>
      <div className="container mx-auto flex flex-col gap-10 py-10">
        <FeedbackForm />
      </div>
    </div>
  )
}
export default Feedback;