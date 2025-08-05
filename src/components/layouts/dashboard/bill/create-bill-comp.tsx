"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

const categories = ["development", "health", "education"];
const stages = ["first-reading", "second-reading", "passed"];

const CreateBill = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    category: "",
    stage: "",
    file: null as File | null,
    image: null as File | null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, file }));
    setFileName(file?.name || null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, image: file }));

    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    else if (formData.title.length < 3) newErrors.title = "Title must be at least 3 characters";

    if (!formData.summary.trim()) newErrors.summary = "Summary is required";
    else if (formData.summary.length < 10) newErrors.summary = "Summary must be at least 10 characters";

    if (!formData.file) newErrors.file = "File is required";
    if (formData.image && !formData.image.type.startsWith("image/"))
      newErrors.image = "Image must be a valid image file";

    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.stage) newErrors.stage = "Stage is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    const payload = new FormData();
    payload.append("title", formData.title);
    payload.append("summary", formData.summary);
    payload.append("file", formData.file!);
    if (formData.image) payload.append("image", formData.image);
    payload.append("category", formData.category);
    payload.append("stage", formData.stage);

    try {
      const res = await fetch("/api/bill", {
        method: "POST",
        body: payload,
        headers: {
          "authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });

      if (!res.ok) throw new Error("Failed to submit");

      toast.success("Bill posted successfully");
      setFormData({
        title: "",
        summary: "",
        category: "",
        stage: "",
        file: null,
        image: null,
      });
      setFileName(null);
      setImagePreview(null);
      setErrors({});
    } catch (err) {
      console.error("Submission error", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Create a New Bill</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Title */}
        <div>
          <label className="block font-medium mb-1">Bill Title</label>
          <input
            type="text"
            name="title"
            className="w-full border rounded px-3 py-2"
            placeholder="Enter bill title"
            value={formData.title}
            onChange={handleChange}
          />
          {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        </div>

        {/* Category */}
        <div>
          <label className="block font-medium mb-1">Category</label>
          <select
            name="category"
            className="w-full border rounded px-3 py-2"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Stage */}
        <div>
          <label className="block font-medium mb-1">Stage</label>
          <select
            name="stage"
            className="w-full border rounded px-3 py-2"
            value={formData.stage}
            onChange={handleChange}
          >
            <option value="">Select stage</option>
            {stages.map((s) => (
              <option key={s} value={s}>
                {s.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
              </option>
            ))}
          </select>
          {errors.stage && <p className="text-red-500 text-sm mt-1">{errors.stage}</p>}
        </div>

        {/* File */}
        <div>
          <label className="block font-medium mb-1">Bill File (PDF or Document)</label>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full"
          />
          {fileName && <p className="text-sm text-gray-600 mt-1">Selected file: {fileName}</p>}
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">Optional Cover Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
          {imagePreview && (
            <Image
              src={imagePreview}
              alt="Preview"
              fill
              className="mt-2 max-h-40 rounded border object-contain"
            />
          )}
          {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
        </div>

        {/* Summary */}
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Summary</label>
          <textarea
            name="summary"
            rows={5}
            className="w-full border rounded px-3 py-2"
            placeholder="Write a brief summary of the bill..."
            value={formData.summary}
            onChange={handleChange}
          />
          {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Create Bill"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBill;
