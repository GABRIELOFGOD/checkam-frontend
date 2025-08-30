"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useMemo } from "react";
import { BillCategories, billStages } from "@/data/category";

const formSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  summary: z.string().min(10, "Summary must be at least 10 characters"),
  file: z
    .any()
    .refine((files) => files instanceof FileList && files.length > 0, {
      message: "File is required",
    }),
  image: z
    .any()
    .optional()
    .refine(
      (file) => !file?.length || file[0].type.startsWith("image/"),
      "Image must be a valid image file"
    ),
  category: z.enum(BillCategories.map((c) => c.name) as [string, ...string[]], {
    errorMap: () => ({ message: "Category is required" }),
  }),
  stage: z.enum(billStages.map((s) => s.name) as [string, ...string[]], {
    errorMap: () => ({ message: "Stage is required" }),
  }),
});

type CreateBillFormValues = z.infer<typeof formSchema>;

const CreateBill = () => {
  const [submitting, setSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<CreateBillFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: useMemo(
      () => ({
        title: "",
        summary: "",
        category: undefined,
        stage: undefined,
      }),
      []
    ),
  });

  const onSubmit = async (data: CreateBillFormValues) => {
    setSubmitting(true);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("summary", data.summary);
    formData.append("file", data.file[0]);
    if (data.image?.[0]) {
      formData.append("image", data.image[0]);
    }
    formData.append("category", data.category);
    formData.append("stage", data.stage);

    try {
      const response = await fetch("/api/bills", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to submit");

      console.log("Submitted successfully");
      form.reset();
      setImagePreview(null);
      setFileName(null);
    } catch (error) {
      console.error("Submission error", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">Create a New Bill</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bill title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {BillCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Stage */}
          <FormField
            control={form.control}
            name="stage"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stage</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      {billStages.map((stage) => (
                        <SelectItem key={stage.id} value={stage.name}>
                          {stage.name.charAt(0).toUpperCase() + stage.name.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* File upload */}
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bill File (PDF or Document)</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      setFileName(e.target.files?.[0]?.name ?? null);
                    }}
                  />
                </FormControl>
                {fileName && <p className="text-sm text-gray-600 mt-1">Selected file: {fileName}</p>}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Optional Cover Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      field.onChange(e.target.files);
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setImagePreview(reader.result as string);
                        reader.readAsDataURL(file);
                      } else {
                        setImagePreview(null);
                      }
                    }}
                  />
                </FormControl>
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Image preview"
                    className="mt-2 rounded-md max-h-40 object-contain border"
                  />
                )}
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Summary */}
          <div className="md:col-span-2">
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Write a brief summary of the bill..." {...field} rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2">
            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? "Submitting..." : "Create Bill"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CreateBill;
