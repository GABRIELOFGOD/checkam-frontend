"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Loading from "@/components/general-loader";
import { timeAgo } from "@/lib/helper";
import { Button } from "@/components/ui/button";
import { Share } from "lucide-react";

export interface Article {
  _id: string;
  title: string;
  content: string;
  author?: {
    fname: string;
    lname: string;
  };
  createdAt: string;
}

const AllArticles = () => {
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
        <Loading />
      </div>
    )
  }

  return (
    <div className="mx-auto py-8 container px-3">
      <h1 className="text-3xl font-bold mb-8">All Articles</h1>

      <div className="grid gap-6">
        {articles.length > 0 ? articles.map((article) => (
          <Link href={`/article/${article._id}`} key={article._id}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-3 truncate">{article.title}</h2>
              <div className="text-gray-600 mb-3 line-clamp-2"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              <div className="flex justify-between">
                <p className="text-sm text-gray-400">
                  {timeAgo(new Date(article.createdAt))}
                </p>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-gray-600"
                  onClick={(e) => {
                    e.preventDefault();
                    if (navigator.share) {
                      navigator.share({
                        title: article.title,
                        text: article.content.replace(/<[^>]*>/g, '').slice(0, 100) + '...',
                        url: `${window.location.origin}/article/${article._id}`
                      }).catch(console.error);
                    } else {
                      navigator.clipboard.writeText(`${window.location.origin}/article/${article._id}`)
                        .then(() => alert('Link copied to clipboard!'))
                        .catch(console.error);
                    }
                  }}
                >
                  <Share className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </Link>
        )) : (
          <div className="w-full flex justify-center h-40 items-center">
            <p className="text-gray-500 italic font-bold">No articles found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllArticles;
