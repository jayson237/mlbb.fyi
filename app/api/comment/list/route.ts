import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data }: { data: string } = await req.json();

    const comments = await prisma?.comment.findMany({
      where: {
        postId: data,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(comments, {
      status: 200,
    });
  } catch (error) {
    return null;
  }
}
