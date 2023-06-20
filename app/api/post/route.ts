import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (error: any) {
    return null;
  }
}
