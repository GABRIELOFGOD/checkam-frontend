import UserSectionCard from "@/components/ui/user-section-card";
import { UserTable } from "@/components/user-table";

const AdminUsers = () => {
  
  return (
    <div className="p-5 flex flex-col gap-5">
      <UserSectionCard />
      <UserTable />
    </div>
  )
}
export default AdminUsers;