import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { commentId, message }: { commentId: string; message: string } =
    await req.json();

  const set = await prisma.comment.update({
    where: {
      id: commentId,
    },
    data: {
      body: message,
    },
  });

  if (!set)
    return NextResponse.json(
      {
        message: "Error editing comment. Please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Edit Successful!",
    },
    {
      status: 200,
    }
  );
}
