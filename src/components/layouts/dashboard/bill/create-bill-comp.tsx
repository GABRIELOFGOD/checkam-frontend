"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";
import { IUser } from "@/models/user";
import { Loader2 } from "lucide-react";
import { BillCategories, billStages } from "@/data/category";
// If you want inline PDF preview (not just filename):
// npm install @react-pdf-viewer/core @react-pdf-viewer/default-layout
// import { Worker, Viewer } from "@react-pdf-viewer/core";

const CreateBill = () => {
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    category: "",
    stage: "",
    file: null as File | null,
    image: null as File | null,
    sponsored: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sponsors, setSponsors] = useState<IUser[]>([]);
  const [loadingSponsors, setLoadingSponsors] = useState(true);

  // PDF/DOC drop handler
  const onDropFile = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      setFilePreview(file.name); // just showing name
    }
  }, []);

  const { getRootProps: getFileRoot, getInputProps: getFileInput } = useDropzone({
    onDrop: onDropFile,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  // Image drop handler
  const onDropImage = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
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

  const getSponsors = async () => {
    try {
      const res = await fetch("/api/users", {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch sponsors");
      const data = await res.json();
      const gotten = data.filter((user: IUser) => user.role === "legislator");
      setSponsors(gotten);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load sponsors");
    } finally {
      setLoadingSponsors(false);
    }
  }

  useEffect(() => {
    getSponsors();
  }, []);

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
    if (!formData.sponsored) newErrors.sponsored = "Sponsor is required";

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
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
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
        sponsored: "",
      });
      setFilePreview(null);
      setImagePreview(null);
      setErrors({});
      location.assign("/dashboard/bills");
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
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
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
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="">Select category</option>
            {BillCategories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        {/* Sponsor */}
        <div>
          <label className="block font-medium mb-1">Bill Sponsor</label>
            <select
              name="sponsor"
              className="w-full border rounded px-3 py-2"
              value={formData.sponsored}
              onChange={(e) => setFormData({ ...formData, sponsored: e.target.value })}
            >
              <option value="">Select sponsor</option>
              {loadingSponsors ? (
                <div className="text-gray-500 py-2 flex w-full justify-center items-center">
                  <Loader2 size={20} className="text-gray-500 animate-spin" />
                </div>
              ) : sponsors.length < 1 ? (
                <option className="text-gray-500 py-2 w-full text-center italic font-bold text-sm">No sponsors available, please add legislator to add a sponsor.</option>
              ) : sponsors.map((sponsor) => (
                <option key={sponsor._id as string} value={sponsor._id as string}>
                  {sponsor.fname} {sponsor.lname}
                </option>
              ))}
            </select>
          {errors.sponsored && <p className="text-red-500 text-sm mt-1">{errors.sponsored}</p>}
        </div>

        {/* Stage */}
        <div>
          <label className="block font-medium mb-1">Stage</label>
          <select
            name="stage"
            className="w-full border rounded px-3 py-2"
            value={formData.stage}
            onChange={(e) => setFormData({ ...formData, stage: e.target.value })}
          >
            <option value="">Select stage</option>
            {billStages.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
          {errors.stage && <p className="text-red-500 text-sm mt-1">{errors.stage}</p>}
        </div>

        {/* File (PDF/DOC) */}
        <div>
          <label className="block font-medium mb-1">Bill File (PDF or Document)</label>
          <div
            {...getFileRoot()}
            className="border-dashed border-2 rounded px-4 py-12 text-center cursor-pointer hover:bg-gray-50"
          >
            <input {...getFileInput()} />
            <p>Drag & drop PDF/DOC here, or click to select</p>
          </div>
          {filePreview && <p className="mt-2 text-sm text-gray-700">Selected: {filePreview}</p>}
          {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
        </div>

        {/* Image */}
        <div>
          <label className="block font-medium mb-1">Optional Cover Image</label>
          <div
            {...getImageRoot()}
            className="border-dashed border-2 rounded px-4 py-12 text-center cursor-pointer hover:bg-gray-50"
          >
            <input {...getImageInput()} />
            <p>Drag & drop an image here, or click to select</p>
          </div>
          {imagePreview && (
            <div className="relative w-full h-40 mt-2">
              <Image
                src={imagePreview}
                alt="Preview"
                fill
                className="rounded border object-contain"
              />
            </div>
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
            onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
          />
          {errors.summary && <p className="text-red-500 text-sm mt-1">{errors.summary}</p>}
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <Button type="submit" disabled={submitting}>
            {submitting ? "Submitting..." : "Create Bill"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CreateBill;
