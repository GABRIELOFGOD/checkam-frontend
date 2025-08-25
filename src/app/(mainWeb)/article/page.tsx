"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  content: string;
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

  const truncateContent = (content: string) => {
    return content.replace(/<[^>]*>/g, "").slice(0, 250) + "...";
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">All Articles</h1>

      <div className="grid gap-6">
        {articles.map((article) => (
          <Link href={`/article/${article.id}`} key={article.id}>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h2 className="text-xl font-semibold mb-3">{article.title}</h2>
              <p className="text-gray-600 mb-4">
                {truncateContent(article.content)}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;
