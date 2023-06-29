import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data }: { data: string } = await req.json();

    const posts = await prisma.post.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    let filteredPosts = posts;

    if (data) {
      filteredPosts = posts?.filter((post) =>
        post.title.toLowerCase().includes(data.toLowerCase())
      );
    }

    return NextResponse.json(filteredPosts, {
      status: 200,
    });
  } catch (error: any) {
    return null;
  }
}
