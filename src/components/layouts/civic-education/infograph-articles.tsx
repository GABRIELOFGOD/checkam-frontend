"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Article {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const InfographArticles = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles?limit=4");
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
    return content.replace(/<[^>]*>/g, "").slice(0, 150) + "...";
  };

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Latest Articles</h2>
        <Link href="/article">
          <Button variant="outline">View All Articles</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {articles.map((article) => (
          <Link href={`/article/${article.id}`} key={article.id}>
            <Card className="p-4 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold mb-2">{article.title}</h3>
              <p className="text-sm text-gray-600">
                {truncateContent(article.content)}
              </p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InfographArticles;
