import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <Loader2 size={20} className="flex my-auto text-gray-600" />
      <p className="text-sm text-gray-500 my-auto">Please wait...</p>
    </div>
  )
}
export default Loading;