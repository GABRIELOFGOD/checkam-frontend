"use client";

import { useEffect, useState } from "react";
import { use } from 'react';
import { Article } from "../page";
import { timeAgo } from "@/lib/helper";

const ReadArticle = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`/api/articles?id=${id}`);
        if (response.ok) {
          const data = await response.json();
          setArticle(data);
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-32 mb-8"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold text-red-600">Article not found</h1>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
        <div className="flex gap-3">
          <p className="text-gray-800 font-semibold">By: {article.author?.fname} {article.author?.lname}</p>
          <p>-</p>
          <p className="text-sm text-gray-500 mb-8">
            Posted: {timeAgo(new Date(article.createdAt))}
          </p>
        </div>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
};

export default ReadArticle;
