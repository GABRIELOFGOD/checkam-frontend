"use client";

import ContentCard from "@/components/content-card";
import AddConstituency from "@/components/layouts/dashboard/content/add-constituency";
import BillContents from "@/components/layouts/dashboard/content/bill-content";
import ConstituencyComponent from "@/components/layouts/dashboard/content/constituency-com";
import UserContent from "@/components/layouts/dashboard/content/user-content";
import ContentSectionCard from "@/components/ui/content-section-card";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ContentManagement = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [refreshConstituency, setRefreshConstituency] = useState(false);
  
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
          title="Contituency"
          content={<ConstituencyComponent refresh={refreshConstituency} setRefresh={setRefreshConstituency} />}
          button={{
            text: "Add constituency",
            onButtonClick: () => setOpen(true)
          }}
        />
        <ContentCard
          title="Articles"
          content={<p>No content yet!</p>}
          button={{
            text: "View more",
            onButtonClick: () => {router.push("/dashboard/articles")}
          }}
        />
      </div>
      {open && (<AddConstituency
        open={open}
        setOpen={setOpen}
        setRefresh={setRefreshConstituency}
        refresh={refreshConstituency}
      />)}
    </div>
  )
}
export default ContentManagement;