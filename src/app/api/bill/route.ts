import cloudinary from "@/config/cloudinary"
import { connectToDatabase } from "@/config/database"
import { Bill } from "@/models/bill"
import { User } from "@/models/user"
import { NextRequest, NextResponse } from "next/server"
import { verify } from "jsonwebtoken"
import { UploadApiResponse } from "cloudinary"

// GET /api/bill - findAll or findOne by id (via query param)
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (id) {
      const bill = await Bill.findOne({ _id: id });
      if (!bill) {
        return NextResponse.json({ message: "Bill not found" }, { status: 404 })
      }
      return NextResponse.json(bill)
    } else {
      const bills = await Bill.find()
      return NextResponse.json(bills)
    }
  } catch (error) {
    console.error("ERROR GET", error)
    return NextResponse.json({ message: "Error fetching bills" }, { status: 500 })
  }
}

// POST /api/bill - create new bill with file and optional image
export async function POST(request: NextRequest) {
  await connectToDatabase()
  
  const authHeader = request.headers.get("authorization")
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Authorization token missing or invalid" }, { status: 401 })
  }

  const token = authHeader.split(" ")[1]
  let decoded
  try {
    decoded = verify(token, process.env.JWT_SECRET!) as { email: string }
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 })
  }

  const user = await User.findOne({ email: decoded.email });
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Access denied" }, { status: 403 })
  }

  try {
    const formData = await request.formData()
    const title = formData.get("title") as string
    const summary = formData.get("summary") as string
    const category = formData.get("category") as string
    const stage = formData.get("stage") as string
    const file = formData.get("file") as File
    const image = formData.get("image") as File | null

    if (!file) {
      return NextResponse.json({ message: "Upload bill file to continue" }, { status: 400 })
    }

    // Upload file
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const uploadedFile = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "raw" }, (error, result) => {
          if (error || !result) reject(error)
          else resolve(result)
        })
        .end(fileBuffer)
    })

    // Upload optional image
    let imageUrl = ""
    if (image) {
      const imageBuffer = Buffer.from(await image.arrayBuffer())
      const uploadedImage = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error || !result) reject(error)
            else resolve(result)
          })
          .end(imageBuffer)
      })
      imageUrl = uploadedImage.secure_url
    }

    const newBill = await Bill.create({
      title,
      summary,
      category,
      stage,
      file: uploadedFile.secure_url,
      image: imageUrl,
    })

    return NextResponse.json(newBill, { status: 201 })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ message: "Error creating bill" }, { status: 500 })
  }
}

// PUT /api/bill - update bill by id (now handles FormData)
export async function PUT(request: NextRequest) {
  await connectToDatabase()
  
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  
  if (!id) {
    return NextResponse.json({ message: "Bill id is required" }, { status: 400 })
  }

  try {
    const formData = await request.formData()
    const title = formData.get("title") as string
    const summary = formData.get("summary") as string
    const category = formData.get("category") as string
    const stage = formData.get("stage") as string
    const imageFile = formData.get("image") as File | null
    const pdfFile = formData.get("file") as File | null

    const updateData: { [key: string]: string } = {
      title,
      summary,
      category,
      stage,
    }

    // Handle image upload if provided
    if (imageFile) {
      const imageBuffer = Buffer.from(await imageFile.arrayBuffer())
      const uploadedImage = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error || !result) reject(error)
            else resolve(result)
          })
          .end(imageBuffer)
      })
      updateData.image = uploadedImage.secure_url
    }

    // Handle PDF upload if provided
    if (pdfFile) {
      const fileBuffer = Buffer.from(await pdfFile.arrayBuffer())
      const uploadedFile = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "raw" }, (error, result) => {
            if (error || !result) reject(error)
            else resolve(result)
          })
          .end(fileBuffer)
      })
      updateData.file = uploadedFile.secure_url
    }

    const updatedBill = await Bill.findByIdAndUpdate(id, updateData, { new: true })
    
    if (!updatedBill) {
      return NextResponse.json({ message: "Bill not found" }, { status: 404 })
    }

    return NextResponse.json(updatedBill)
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ message: "Error updating bill" }, { status: 500 })
  }
}

// DELETE /api/bill - delete bill by id
export async function DELETE(request: NextRequest) {
  await connectToDatabase()
  
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  
  if (!id) {
    return NextResponse.json({ message: "Bill id is required" }, { status: 400 })
  }

  try {
    const deletedBill = await Bill.findByIdAndDelete(id)
    if (!deletedBill) {
      return NextResponse.json({ message: "Bill not found" }, { status: 404 })
    }
    return NextResponse.json(deletedBill)
  } catch (error) {
    console.error("Delete error:", error)
    return NextResponse.json({ message: "Error deleting bill" }, { status: 500 })
  }
}
