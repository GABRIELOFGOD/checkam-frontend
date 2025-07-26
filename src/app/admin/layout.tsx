import AdminSidebar from "@/components/layouts/admin/admin-sidebar";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="h-screen w-full overflow-hidden bg-gray-100">
      <div className="flex w-full">
        <AdminSidebar />
        {children}
      </div>
    </div>
  )
}
export default AdminLayout;