"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const ArticlesPage = () => {
  const router = useRouter();
  
  return (
    <div className="flex flex-col gap-5 p-5">
      <div className="flex justify-between gap-5">
        <h1 className="text-2xl font-bold">Articles</h1>
        <Button
          onClick={() => router.push("/dashboard/articles/create")}
        >
          Create Article
        </Button>
      </div>
      <p>No articles available.</p>
    </div>
  )
}
export default ArticlesPage;