import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const { img }: { img: string } = await req.json();

  const set = await prisma.user.update({
    where: {
      email: currentUser?.email,
    },
    data: {
      image: img,
    },
  });

  if (!set)
    return NextResponse.json(
      {
        message: "Error setting new profile picture, please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Profile picture updated",
    },
    {
      status: 200,
    }
  );
}
