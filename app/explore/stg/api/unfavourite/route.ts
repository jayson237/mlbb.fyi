import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const { postId }: { postId: string } = await req.json();

  if (!currentUser) {
    return NextResponse.json(
      {
        message: "User not found",
      },
      {
        status: 400,
      }
    );
  }

  if (!postId) {
    return NextResponse.json(
      {
        message: "Post not found",
      },
      {
        status: 400,
      }
    );
  }

  const updatedFavourite = currentUser.favourite.filter((id) => id !== postId);

  const setCurrentFollowings = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favourite: updatedFavourite,
    },
  });

  if (!setCurrentFollowings) {
    return NextResponse.json(
      {
        message: "Failed to unfavourite, please try again",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "Post has been removed from starred",
    },
    {
      status: 200,
    }
  );
}
