import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data }: { data: string } = await req.json();

    const replies = await prisma?.reply.findMany({
      where: {
        commentId: data,
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json([replies, replies.length], {
      status: 200,
    });
  } catch (error) {
    return null;
  }
}
