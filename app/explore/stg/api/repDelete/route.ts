import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { replyId }: { replyId: string } = await req.json();

  const deleteReply = await prisma.reply.delete({
    where: {
      id: replyId,
    },
  });

  if (!deleteReply)
    return NextResponse.json(
      {
        message: "Error deleting reply, please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Successfully deleted reply!",
    },
    {
      status: 200,
    }
  );
}
