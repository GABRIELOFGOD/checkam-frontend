import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Loading = ({ text="Please wait...", className }: { text?: string, className?: string }) => {
  return (
    <div className={cn("flex items-center justify-center h-full w-full gap-2", className)}>
      <Loader2 size={15} className="flex my-auto text-gray-600" />
      <p className="text-sm text-gray-500 my-auto font-bold">{text}</p>
    </div>
  )
}
export default Loading;