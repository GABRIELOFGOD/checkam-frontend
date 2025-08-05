// import cloudinary from "@/config/cloudinary";
// import { connectToDatabase } from "@/config/database";
// import { Bill } from "@/models/bill";
// import { User } from "@/models/user";
// import { NextRequest, NextResponse } from "next/server";
// import { verify } from 'jsonwebtoken';
// import { NextApiRequest, NextApiResponse } from "next";
// import { IncomingForm } from 'formidable';
// import { UploadApiOptions } from "cloudinary";

// // GET /api/users - findAll or findOne by id (via query param)
// export async function GET(request: NextRequest) {
//   await connectToDatabase();
//   const { searchParams } = new URL(request.url);
//   const id = searchParams.get('id');

//   if (id) {
//     // Find one by id
//     const bill = await Bill.findById(id);
//     if (!bill) {
//       return NextResponse.json({ message: 'Bill not found' }, { status: 404 });
//     }
//     return NextResponse.json(bill);
//   } else {
//     // Find all
//     const bill = await Bill.find();
//     return NextResponse.json(bill);
//   }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(request: NextRequest) {
//   await connectToDatabase();

//   const authHeader = request.headers.get("authorization");
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return NextResponse.json({ error: "Authorization token missing or invalid" }, { status: 401 });
//   }

//   const token = authHeader.split(" ")[1];
//   let decoded;
//   try {
//     decoded = verify(token, process.env.JWT_SECRET!) as { email: string };
//   } catch {
//     return NextResponse.json({ error: "Invalid token" }, { status: 401 });
//   }

//   const user = await User.findOne({ email: decoded.email });
//   if (!user || user.role !== "admin") {
//     return NextResponse.json({ error: "Access denied" }, { status: 403 });
//   }

//   try {
//     const formData = await request.formData();
//     const title = formData.get("title") as string;
//     const summary = formData.get("summary") as string;
//     const category = formData.get("category") as string;
//     const stage = formData.get("stage") as string;
//     const file = formData.get("file") as File;
//     const image = formData.get("image") as File | null;

//     if (!file) {
//       return NextResponse.json({ message: "Upload bill file to continue" }, { status: 400 });
//     }

//     // Convert file to Buffer for Cloudinary
//     const fileBuffer = Buffer.from(await file.arrayBuffer());
//     const uploadedFile = await new Promise<unknown>((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({ resource_type: "raw" }, (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         })
//         .end(fileBuffer);
//     });

//     let imageUrl = "";
//     if (image) {
//       const imageBuffer = Buffer.from(await image.arrayBuffer());
//       const uploadedImage = await new Promise<UploadApiOptions>((resolve, reject) => {
//         cloudinary.uploader
//           .upload_stream({ resource_type: "image" }, (error, result) => {
//             if (error || undefined) return reject(error);
//             else resolve(result);
//           })
//           .end(imageBuffer);
//       });

//       imageUrl = uploadedImage.secure_url;
//     }

//     const bill = await Bill.create({
//       title,
//       summary,
//       category,
//       stage,
//       file: uploadedFile.secure_url,
//       image: imageUrl,
//     });

//     return NextResponse.json(bill, { status: 201 });
//   } catch (error) {
//     console.error("Upload error:", error);
//     return NextResponse.json({ message: "Error creating bill", error }, { status: 500 });
//   }
// }

// // PUT /api/users?id=... - update user by id
// export async function PUT(request: NextRequest) {
//   // const { searchParams } = new URL(request.url);
//   // const id = searchParams.get('id');
//   // await connectToDatabase();
//   // if (!id) {
//   //   return NextResponse.json({ message: 'User id is required' }, { status: 400 });
//   // }
//   // const body = await request.json();
//   // try {
//   //   const user = await User.findByIdAndUpdate(id, body, { new: true });
//   //   if (!user) {
//   //     return NextResponse.json({ message: 'User not found' }, { status: 404 });
//   //   }
//   //   return NextResponse.json(user);
//   // } catch (error) {
//   //   return NextResponse.json({ message: 'Error updating user', error }, { status: 400 });
//   // }
// }

// // DELETE /api/users?id=... - delete user by id
// export async function DELETE(request: NextRequest) {
//   // const { searchParams } = new URL(request.url);
//   // const id = searchParams.get('id');
//   // await connectToDatabase();
//   // if (!id) {
//   //   return NextResponse.json({ message: 'User id is required' }, { status: 400 });
//   // }
//   // try {
//   //   const user = await User.findByIdAndDelete(id);
//   //   if (!user) {
//   //     return NextResponse.json({ message: 'User not found' }, { status: 404 });
//   //   }
//   //   return NextResponse.json(user);
//   // } catch (error) {
//   //   return NextResponse.json({ message: 'Error deleting user', error }, { status: 400 });
//   // }
// }


import cloudinary from "@/config/cloudinary";
import { connectToDatabase } from "@/config/database";
import { Bill } from "@/models/bill";
import { User } from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { UploadApiResponse } from "cloudinary";

export const config = {
  api: {
    bodyParser: false,
  },
};

// GET /api/bill - findAll or findOne by id (via query param)
export async function GET(request: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (id) {
    const bill = await Bill.findById(id);
    if (!bill) {
      return NextResponse.json({ message: "Bill not found" }, { status: 404 });
    }
    return NextResponse.json(bill);
  } else {
    const bills = await Bill.find();
    return NextResponse.json(bills);
  }
}

// POST /api/bill - create new bill with file and optional image
export async function POST(request: NextRequest) {
  await connectToDatabase();

  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Authorization token missing or invalid" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = verify(token, process.env.JWT_SECRET!) as { email: string };
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  const user = await User.findOne({ email: decoded.email });
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Access denied" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const title = formData.get("title") as string;
    const summary = formData.get("summary") as string;
    const category = formData.get("category") as string;
    const stage = formData.get("stage") as string;
    const file = formData.get("file") as File;
    const image = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json({ message: "Upload bill file to continue" }, { status: 400 });
    }

    // Upload file
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const uploadedFile = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "raw" }, (error, result) => {
          if (error || !result) reject(error);
          else resolve(result);
        })
        .end(fileBuffer);
    });

    // Upload optional image
    let imageUrl = "";
    if (image) {
      const imageBuffer = Buffer.from(await image.arrayBuffer());
      const uploadedImage = await new Promise<UploadApiResponse>((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ resource_type: "image" }, (error, result) => {
            if (error || !result) reject(error);
            else resolve(result);
          })
          .end(imageBuffer);
      });

      imageUrl = uploadedImage.secure_url;
    }

    const newBill = await Bill.create({
      title,
      summary,
      category,
      stage,
      file: uploadedFile.secure_url,
      image: imageUrl,
    });

    return NextResponse.json(newBill, { status: 201 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ message: "Error creating bill" }, { status: 500 });
  }
}

// PUT /api/bill?id=... - update bill by id
export async function PUT(request: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Bill id is required" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const updatedBill = await Bill.findByIdAndUpdate(id, body, { new: true });

    if (!updatedBill) {
      return NextResponse.json({ message: "Bill not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBill);
  } catch (error) {
    return NextResponse.json({ message: "Error updating bill", error }, { status: 400 });
  }
}

// DELETE /api/bill?id=... - delete bill by id
export async function DELETE(request: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "Bill id is required" }, { status: 400 });
  }

  try {
    const deletedBill = await Bill.findByIdAndDelete(id);

    if (!deletedBill) {
      return NextResponse.json({ message: "Bill not found" }, { status: 404 });
    }

    return NextResponse.json(deletedBill);
  } catch (error) {
    return NextResponse.json({ message: "Error deleting bill", error }, { status: 400 });
  }
}
