import { connectToDatabase } from "@/config/database";
import Constituency from "@/models/constituency";
import Discussion from "@/models/discussions";
import { IUser, User } from "@/models/user";
import { uploadFiles } from "@/utils/cloud";
import { verify } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// export async function GET(request: NextRequest) {
//   try {
//     await connectToDatabase();
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get("id");

//     if (id) {
//       // const discussion = await Discussion
//     }
//   } catch (error) {
//     console.log(error);
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }

// export async function POST(request: NextRequest) {
//   await connectToDatabase()

//       const authHeader = request.headers.get("authorization")
//       if (!authHeader || !authHeader.startsWith("Bearer ")) {
//         return NextResponse.json({ error: "Authorization token missing or invalid" }, { status: 401 })
//       }

//       const token = authHeader.split(" ")[1]
//       let decoded
//       try {
//         decoded = verify(token, process.env.JWT_SECRET!) as { email: string }
//       } catch {
//         return NextResponse.json({ error: "Invalid token" }, { status: 401 })
//       }
//   try {

//     const user = await User.findOne({ email: decoded.email });
//     if (!user) return NextResponse.json({
//       message: "User not found"
//     }, { status: 404 });
//     const formData = await request.formData();
//     const content = formData.get("content") as string;
//     const constituencies = formData.get("constituencies") as string[] | null;
//     const tags = formData.get("tags") as string[] | null;
//     const files = formData.get("files") as File[] | null;

//     if (!content) return NextResponse.json({ message: "Please write a discussion to post" });

//     let fileUrls: string[] = []

//     if (files) {
//       fileUrls = await uploadFiles(files)
//       console.log("Urls", fileUrls);
//     }

//     if (constituencies) {
//       for (const constituency in constituencies) {
//         const itExists = await Constituency.findById(constituency);
//         if (!itExists) return NextResponse.json({ message: "Added constituency does not exist" }, { status: 404 });
//       }
//     }

//     if (tags) {
//       for (const tag in tags) {
//         const isLegislator = await User.findById(tag);
//         if (!isLegislator || isLegislator.role !== "legislator") {
//           return NextResponse.json({ message: "You can only tag legislators in your post" }, { status: 400 });
//         }
//       }
//     }

//     const newDiscussion = await Discussion.create({
//       content,
//       tags,
//       images: fileUrls,
//       constituencies,
//       postedBy: user._id
//     });

//     return NextResponse.json(newDiscussion, {status: 201});

//   } catch (error) {
//     console.log("Error posting discussion", error);
//     return NextResponse.json({ message: "Error posting discussion", error }, { status: 500 });
//   }
// }

export async function POST(request: NextRequest) {
  await connectToDatabase();

  // === AUTH HEADER CHECK ===
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Authorization token missing or invalid" },
      { status: 401 }
    );
  }

  const token = authHeader.split(" ")[1];
  let decoded;
  try {
    decoded = verify(token, process.env.JWT_SECRET!) as { email: string };
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }

  try {
    const user = await User.findOne({ email: decoded.email });
    if (!user)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    // === READ FORM DATA ===
    const formData = await request.formData();
    const content = formData.get("content") as string;

    if (!content)
      return NextResponse.json(
        { error: "Please write a discussion to post" },
        { status: 400 }
      );

    const constituencies = formData.get("constituencies")
      ? JSON.parse(formData.get("constituencies") as string)
      : [];

    const tags = formData.get("tags")
      ? JSON.parse(formData.get("tags") as string)
      : [];

    const files = formData.getAll("files") as File[];

    // === UPLOAD FILES ===
    let fileUrls: string[] = [];
    if (files && files.length > 0) {
      fileUrls = await uploadFiles(files);
    }

    // === VALIDATE CONSTITUENCIES ===
    for (const id of constituencies) {
      const exists = await Constituency.findById(id);
      if (!exists)
        return NextResponse.json(
          { error: "Added constituency does not exist" },
          { status: 404 }
        );
    }

    // === VALIDATE TAGS ===
    for (const id of tags) {
      const tagged = await User.findById(id);
      if (!tagged || tagged.role !== "legislator") {
        return NextResponse.json(
          { error: "You can only tag legislators" },
          { status: 400 }
        );
      }
    }

    // === SAVE DISCUSSION ===
    const newDiscussion = await Discussion.create({
      content,
      tags,
      images: fileUrls,
      constituencies,
      postedBy: user._id,
    });

    return NextResponse.json(newDiscussion, { status: 201 });
  } catch (error: unknown) {
    console.log("Error posting discussion", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, error },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Error posting discussion", error },
        { status: 500 }
      );
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      const discussion = await Discussion.findOne({ _id: id });
      if (!discussion)
        return NextResponse.json(
          {
            message:
              "Discussion not found, something must be wrong please reload or go a step backward",
          },
          { status: 404 }
        );

      return NextResponse.json(discussion, { status: 200 });
    } else {
      const discussions = await Discussion.find()
        .populate("postedBy")
        // .populate("likes")
        // .populate("likes", "fname lname email")
        // .populate("comments"
        // populate: { path: "by", select: "fname lname image role email" },
        // )
        .populate("constituencies");
      // .populate("tags")
      // .populate("notableComments");
      return NextResponse.json(discussions.reverse(), { status: 200 });
    }
  } catch (error: unknown) {
    console.log("Error posting discussion", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, error },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        { message: "Error posting discussion", error },
        { status: 500 }
      );
    }
  }
}

export async function PUT(request: NextRequest) {
  await connectToDatabase();
  // Use centralized auth util
  const { authenticateRequest } = await import("@/lib/auth-utils");
  type AuthResult = { error?: NextResponse } | { user: IUser };
  const authResult = (await authenticateRequest(
    request as NextRequest
  )) as AuthResult;
  if ("error" in authResult && authResult.error) return authResult.error;

  const { user } = authResult as { user: IUser };

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Discussion id is required" },
        { status: 400 }
      );
    }

    const discussion = await Discussion.findById(id);
    if (!discussion) {
      return NextResponse.json(
        { error: "Discussion not found" },
        { status: 404 }
      );
    }

    // Ensure likes is an array
    if (!Array.isArray(discussion.likes)) discussion.likes = [];

    // Work with string IDs for comparison and treat likes as unknown[] so we can handle both populated user objects and id values
    const userIdStr = user._id ? user._id.toString() : user.id?.toString();
    const likesArr = discussion.likes as unknown[];
    const existingIndex = likesArr.findIndex((l: unknown) => {
      try {
        return (l as IUser).toString() === userIdStr;
      } catch {
        return false;
      }
    });

    let action = "liked";
    if (existingIndex > -1) {
      // unlike
      likesArr.splice(existingIndex, 1);
      action = "unliked";
    } else {
      // like
      likesArr.push(user._id);
    }

    // assign back in case original type was different
    discussion.likes = likesArr as IUser[];

    await discussion.save();
    return NextResponse.json(
      {
        message: `Discussion ${action}`,
        likesCount: discussion.likes.length,
        likes: discussion.likes,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.log("Error updating discussion like", error);
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, error },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { message: "Error updating discussion like", error },
      { status: 500 }
    );
  }
}
