import AdminBillMapper from "@/components/layouts/dashboard/bill/admin-map-bills";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const AdminBills = () => {
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex w-full justify-end">
        <Link href="/dashboard/bill/create">
          <Button>
            <Plus />
            <p className="text-sm font-semibold">Add bill</p>
          </Button>
        </Link>
      </div>

      <AdminBillMapper />
    </div>
  )
}
export default AdminBills;