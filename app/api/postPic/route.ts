import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data }: { data: string } = await req.json();

    const post = await prisma.post.findFirst({
      where: {
        id: data,
      },
    });

    const image = post?.image;

    return NextResponse.json(image, {
      status: 200,
    });
  } catch (error: any) {
    return null;
  }
}
