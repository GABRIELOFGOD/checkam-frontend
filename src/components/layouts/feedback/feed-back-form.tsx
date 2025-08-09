import { Label } from "@/components/ui/label";

const FeedbackForm = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-2xl font-bold">Feedback zone</h1>
        <p className="text-gray-500">
          We value your feedback. Please let us know your thoughts.
        </p>
      </div>

      <div className="p-3 shadow-sm rounded-md border border-border">
        <form>
          <div className="flex flex-col gap-2">
            <Label htmlFor="about" className="font-semibold">
              What is your feedback about?
            </Label>
          </div>
        </form>
      </div>
    </div>
  );
};
export default FeedbackForm;
