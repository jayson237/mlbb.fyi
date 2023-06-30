import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data }: { data: string } = await req.json();

    const posts = await prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (data) {
      const filteredPosts = posts?.filter((post) =>
        post.title.toLowerCase().includes(data.toLowerCase())
      );

      if (filteredPosts.length !== 0) {
        return NextResponse.json(filteredPosts, {
          status: 200,
        });
      }

      return NextResponse.json("empty", {
        status: 200,
      });
    }

    return NextResponse.json(posts, {
      status: 200,
    });
  } catch (error: any) {
    return null;
  }
}
