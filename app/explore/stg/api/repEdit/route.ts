import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { replyId, message }: { replyId: string; message: string } =
    await req.json();

  const set = await prisma.reply.update({
    where: {
      id: replyId,
    },
    data: {
      body: message,
    },
  });

  if (!set)
    return NextResponse.json(
      {
        message: "Error editing reply. Please try again",
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
