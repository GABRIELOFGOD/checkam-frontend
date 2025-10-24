"use client";

import { useCallback, useState } from "react";
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
import { Card } from "@/components/ui/card";
import MenuBar from "@/components/menubar";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import NextImage from "next/image";
import { useDropzone } from "react-dropzone";

const CreateArticlePage = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [articleImage, setArticleImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDropImage = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setArticleImage(file);
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps: getImageRoot, getInputProps: getImageInput } = useDropzone({
      onDrop: onDropImage,
      multiple: false,
      accept: { "image/*": [] },
    });

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
    immediatelyRender: false, // Add this to fix SSR hydration issues
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
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      if (articleImage) {
        formData.append("image", articleImage);
      }
      
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setTitle("");
        editor.commands.setContent("");
        toast.success("Article created successfully!");
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

  return (
    <Card className="p-6 max-w-5xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
          <Input
            type="text"
            placeholder="Article Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mb-4"
          />

          <div>
            <div
              {...getImageRoot()}
              className="border-dashed border-2 rounded px-4 py-12 text-center cursor-pointer hover:bg-gray-50"
            >
              <input {...getImageInput()} />
              <p>Drag & drop an image here, or click to select</p>
            </div>
            {imagePreview && (
              <div className="relative w-full h-40 mt-2">
                <NextImage
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="rounded border object-contain"
                />
              </div>
            )}
          </div>
          
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
          {loading ? "Creating..." : "Create Article"}
        </Button>
      </form>
    </Card>
  );
};

export default CreateArticlePage;
