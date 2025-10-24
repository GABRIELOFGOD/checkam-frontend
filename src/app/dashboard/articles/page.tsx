"use client";

import { Article } from "@/app/(mainWeb)/article/page";
import Loading from "@/components/general-loader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { timeAgo } from "@/lib/helper";
import { ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ArticlesPage = () => {
  const router = useRouter();
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchArticles = async () => {
        try {
          const response = await fetch("/api/articles");
          if (response.ok) {
            const data = await response.json();
            setArticles(data);
          }
        } catch (error) {
          console.error("Error fetching articles:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchArticles();
    }, []);
  
    if (loading) {
      return (
        <div className="h-screen w-full flex justify-center items-center">
          <Loading text="Admin wait as we load the articles..." />
        </div>
      )
    }
  
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
      
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3 lg:grid-cols-4">
        {articles.length > 0 ? articles.map((article) => (
          <Link href={`/dashboard/articles/${article._id}`} key={article._id}>
            <Card className="p-3 hover:shadow-lg transition-shadow h-full">
              <div className="w-full h-[250px] relative rounded-t-lg overflow-hidden">
                {article.image ? (
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex justify-center items-center bg-gray-300/50 border-gray-400/70">
                    <ImageIcon size={24} />
                  </div>
                )}
                <div className="px-4 absolute bottom-0 text-white bg-black/50 w-full text-center">
                  <h2 className="text-lg font-semibold line-clamp-2 z-40">{article.title}</h2>
                </div>
              </div>
              <div className="text-gray-600 mb-3 line-clamp-4"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              <p className="text-sm text-gray-400">
                {timeAgo(new Date(article.createdAt))}
              </p>
            </Card>
          </Link>
        )) : (
          <div className="w-full flex justify-center h-40 items-center">
            <p className="text-gray-500 italic font-bold">No articles found</p>
          </div>
        )}
      </div>
    </div>
  )
}
export default ArticlesPage;