import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data }: { data: string } = await req.json();

    const posts = await prisma.post.findMany({
      where: {
        createdBy: data,
      },
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
