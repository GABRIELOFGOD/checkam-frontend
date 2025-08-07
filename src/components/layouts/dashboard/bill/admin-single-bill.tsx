'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { DownloadIcon, UploadCloud } from 'lucide-react'
import { useState, ChangeEvent, FormEvent } from "react"
import Image from "next/image"
import { IBill, Category, BillStage } from "@/models/bill"
// import { ChangeEvent, useState } from "react"
import { toast } from "sonner"
import { SelectItem } from "@radix-ui/react-select"


const AdminSingleBillClient = ({ bill }: { bill: IBill }) => {
  // Initialize states with the bill data to prevent hydration mismatch
  const [title, setTitle] = useState(bill.title)
  const [summary, setSummary] = useState(bill.summary || '')
  const [category, setCategory] = useState(bill.category)
  const [stage, setStage] = useState(bill.stage)
  const [imagePreview, setImagePreview] = useState<string | null>(bill.image || null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfFileName, setPdfFileName] = useState<string>(
    bill.file ? bill.file.split("/").pop() || "" : ""
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setImageFile(file)
      // Only create object URL on client side
      if (typeof window !== 'undefined') {
        setImagePreview(URL.createObjectURL(file))
      }
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      setPdfFileName(file.name)
    }
  }

  const handleImageDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      setImageFile(file)
      if (typeof window !== 'undefined') {
        setImagePreview(URL.createObjectURL(file))
      }
    }
  }

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)
      setPdfFileName(file.name)
    }
  }

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("summary", summary)
      formData.append("category", category)
      formData.append("stage", stage)
      
      if (imageFile) formData.append("image", imageFile)
      if (pdfFile) formData.append("file", pdfFile)

      const res = await fetch(`/api/bill?id=${bill._id}`, {
        method: "PUT",
        body: formData,
      })

      if (res.ok) {
        toast.success("Bill updated successfully")
      } else {
        const errorData = await res.json()
        toast.error(errorData.message || "Failed to update bill")
      }
    } catch (error) {
      console.error("Update error:", error)
      toast.error("Failed to update bill")
    } finally {
      setIsSubmitting(false)
    }
  }

  // const [bill, setBill] = useState<IBill>(passed);

  // return  (
  //   <div className="p-10">
  //     <form className="flex flex-col gap-5">
  //       <div>
  //         <h1 className="text-2xl font-bold">Edit Bill</h1>
  //         <p className="font-semibold text-gray-400">Change the contents of a bill</p>
  //       </div>

  //       <div className="flex flex-col gap-3">
  //         <div className="flex flex-col gap-1">
  //           <label htmlFor="title" className="font-bold">
  //             Bill title
  //           </label>
  //           <Input
  //             placeholder="Bill title here"
  //             value={bill.title}
  //             onChange={(e: ChangeEvent<HTMLInputElement>) => setBill(prev => ({ ...prev, title: e.target.value }))}
  //           />
  //         </div>

  //         <div className="flex flex-col gap-1">
  //           <label htmlFor="title" className="font-bold">
  //             Bill summary
  //           </label>
  //           <Textarea
  //             placeholder="Bill summary here"
  //             value={bill.summary}
  //             onChange={(e: ChangeEvent<HTMLInputElement>) => setBill(prev => ({ ...prev, summary: e.target.value }))}
  //           />
  //         </div>

  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
  //           <div className="flex flex-col gap-1 w-full">
  //             <label htmlFor="title" className="font-bold">
  //               Bill Stage
  //             </label>
  //             <Select>
  //               <SelectTrigger className="w-[180px]">
  //                 <SelectValue placeholder="Bill Stage" />
  //               </SelectTrigger>
  //               <SelectContent>
                  
  //               </SelectContent>
  //             </Select>
  //           </div>

  //           <div className="flex flex-col gap-1">
  //             <label htmlFor="title" className="font-bold">
  //               Bill summary
  //             </label>
  //             <Textarea
  //               placeholder="Bill summary here"
  //               value={bill.summary}
  //               onChange={(e: ChangeEvent<HTMLInputElement>) => setBill(prev => ({ ...prev, summary: e.target.value }))}
  //             />
  //           </div>
  //         </div>
  //       </div>
  //     </form>
  //   </div>
  // )

  const mappedStage = ["first-reading", "second-reading", "passed"];
  const mappedCategories = ["development", "health", "education"];
  
  return (
    <form onSubmit={handleUpdate} className="p-6 w-full mx-auto space-y-6">
      <div className="shadow-md p-3">
        <div>
          <div>
            <h1 className="text-xl font-bold mb-5">Edit Bill</h1>
          </div>
        </div>
        <div className="space-y-6">
          {/* Image Upload */}
          <div>
            <label
              onDrop={handleImageDrop}
              onDragOver={(e) => e.preventDefault()}
              htmlFor="image-upload"
              className="relative border border-dashed border-muted-foreground rounded-lg h-60 w-full flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition"
            >
              {imagePreview ? (
                <Image
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  fill
                  className="object-contain rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <UploadCloud className="h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to upload image
                  </p>
                </div>
              )}
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageSelect}
              />
            </label>
          </div>

          {/* Title */}
          <Input
            placeholder="Enter bill title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          {/* Category */}
          <Select value={category} onValueChange={(e) => setCategory(e as Category)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {mappedCategories.map((stage, i) => (
                <SelectItem className="capitalise" value={stage} key={i}>{stage}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Stage */}
          <Select value={stage} onValueChange={(value) => setStage(value as BillStage)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {mappedStage.map((stage, i) => (
                <SelectItem className="capitalise" value={stage} key={i}>{stage}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Summary */}
          <Textarea
            placeholder="Enter bill summary..."
            rows={6}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
          />

          {/* PDF File Upload */}
          <div>
            <label
              onDrop={handleFileDrop}
              onDragOver={(e) => e.preventDefault()}
              htmlFor="pdf-upload"
              className="relative border border-dashed border-muted-foreground rounded-lg h-32 w-full flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted transition"
            >
              <div className="flex flex-col items-center gap-2">
                <UploadCloud className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {pdfFileName || "Drag and drop or click to upload bill file (PDF)"}
                </p>
              </div>
              <input
                id="pdf-upload"
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileSelect}
              />
            </label>
            {bill.file && !pdfFile && (
              <div className="flex items-center justify-between mt-3">
                <a
                  href={bill.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-primary hover:underline"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Download current file
                </a>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="pt-4">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default AdminSingleBillClient
