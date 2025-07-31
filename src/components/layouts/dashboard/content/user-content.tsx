import { useAdmin } from "@/providers/admin-provider";
import UserContentCard from "./user-content-card";
import { Loader2 } from "lucide-react";

const UserContent = () => {
  const { users } = useAdmin();

  const displayable = users.data.slice(0, 11);
  
  return (
    <div>
      { users.error ? (
        <div className='w-full h-[200px] flex gap-3 justify-center items-center'>
          <p className="font-bold text-sm my-auto">Error fetching users</p>
        </div>)
        : users.loading ? (
        <div className='w-full h-[200px] flex gap-3 justify-center items-center'>
          <Loader2 className="animate-spin my-auto" size={15} />
          <p className="font-bold text-sm my-auto">Loading users</p>
        </div>
      ) : (<div className="flex flex-col gap-2">
        {displayable.map((user, i) => (
          <UserContentCard
            key={i}
            user={user}
          />
        ))}
      </div>)}
    </div>
  )
}
export default UserContent;