"use client";

import ContentCard from "@/components/content-card";
import BillContents from "@/components/layouts/dashboard/content/bill-content";
import UserContent from "@/components/layouts/dashboard/content/user-content";
import ContentSectionCard from "@/components/ui/content-section-card";
import { useRouter } from "next/navigation";

const ContentManagement = () => {
  const router = useRouter();
  
  return (
    <div className="flex flex-col gap-10 p-5">
      <ContentSectionCard />
      <div className="grid gap-5 grid-cols-1 md:grid-cols-2">
        <ContentCard
          title="Users"
          content={<UserContent />}
          button={{
            text: "View more",
            onButtonClick: () => {router.push("/dashboard/users")}
          }}
        />
        <ContentCard
          title="Bills"
          content={<BillContents />}
          button={{
            text: "Create bill",
            onButtonClick: () => {router.push("/dashboard/bill/create")}
          }}
        />
        <ContentCard
          title="Infographs"
          content={<p>No content yet!</p>}
          button={{
            text: "View more",
            onButtonClick: () => {router.push("/dashboard/users")}
          }}
        />
        <ContentCard
          title="Videos"
          content={<p>No content yet!</p>}
          button={{
            text: "View more",
            onButtonClick: () => {router.push("/dashboard/users")}
          }}
        />
      </div>
    </div>
  )
}
export default ContentManagement;