import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { User } from "@/models/user";

export async function authenticateRequest(request: NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return {
      error: NextResponse.json(
        { error: "Authorization token missing or invalid" },
        { status: 401 }
      ),
    };
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as { email: string };
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return {
        error: NextResponse.json({ error: "User not found" }, { status: 401 }),
      };
    }

    return { user };
  } catch (e) {
    console.log("Error", e);
    return {
      error: NextResponse.json({ error: "Invalid token" }, { status: 401 }),
    };
  }
}

// export async function authenticateAdminRequest(request: NextRequest) {
//   const result = await authenticateRequest(request);
//   if ((result as any).error) return result;

//   const { user } = result as { user: typeof User & { role?: string } };
//   if (user.role !== "admin") {
//     return {
//       error: NextResponse.json({ error: "Access denied" }, { status: 403 }),
//     };
//   }
//   return { user };
// }

type AuthSuccess = { user: InstanceType<typeof User> };
type AuthError = { error: NextResponse };
type AuthResult = AuthSuccess | AuthError;

export async function authenticateAdminRequest(
  request: NextRequest
): Promise<AuthResult> {
  const result = (await authenticateRequest(request)) as AuthResult;

  if ("error" in result) return result; // already typed

  const { user } = result;

  if (user.role !== "admin") {
    return {
      error: NextResponse.json(
        { error: "Access denied" },
        { status: 403 }
      ),
    };
  }

  return { user };
}
