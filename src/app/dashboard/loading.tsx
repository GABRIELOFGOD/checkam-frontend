import { Loader2 } from "lucide-react";

const DashboardLoader = () => {
  return (
    <div className="h-full w-full flex justify-center items-center gap-2">
      <Loader2 className="animate-spin my-auto" size={15} />
      <p className="font-semibold text-sm my-auto">Hey Administrator! can you please wait a moment?</p>
    </div>
  )
}
export default DashboardLoader;