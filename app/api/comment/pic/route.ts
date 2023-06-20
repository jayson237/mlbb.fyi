import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data }: { data: string } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        id: data,
      },
    });

    const image = user?.image;

    return NextResponse.json(image, {
      status: 200,
    });
  } catch (error: any) {
    return null;
  }
}
