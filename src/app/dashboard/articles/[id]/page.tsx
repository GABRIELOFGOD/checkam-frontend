"use client";

import { use, useEffect, useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
// import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import MenuBar from "@/components/menubar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loading from "@/components/general-loader";

const EditArticlePage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [gettingData, setGettingData] = useState<boolean>(true);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Image,
      Link,
      Color,
    ],
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;

    setLoading(true);
    setError("");
    const content = editor.getHTML();

    try {
      const response = await fetch(`/api/articles?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ title, content }),
      });

      const data = await response.json();

      if (response.ok) {
        setTitle("");
        editor.commands.setContent("");
        toast.success("Article updated successfully!");
        router.push(`/dashboard/articles`);
      } else {
        setError(data.error || "Failed to create article");
      }
    } catch (error) {
      console.error("Error creating article:", error);
      setError("Failed to create article. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editor) {
      const fetchArticle = async () => {
        try {
          const response = await fetch(`/api/articles?id=${id}`);
          const data = await response.json();
          setTitle(data.title);
          editor.commands.setContent(data.content);
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch article data");
        } finally {
          setGettingData(false);
        }
      };

      fetchArticle();
    }
  }, [editor, id]);

  if (gettingData) {
    return (
      <div className="h-full w-full flex justify-center items-center">
        <Loading text="Getting article data..." />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-5 p-5">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-6">Edit Article</h1>
          <Input
            type="text"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
          />
          <div className="border rounded-lg">
            {editor ? (
              <>
                <MenuBar editor={editor} />
                <div className="min-h-[400px] p-4">
                  <EditorContent editor={editor} />
                </div>
              </>
            ) : (
              <div className="min-h-[400px] p-4 animate-pulse bg-gray-100">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            )}
          </div>
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <Button type="submit" disabled={loading}>
          {loading ? "Updating..." : "Update Article"}
        </Button>
      </form>
    </div>
  )
}
export default EditArticlePage;