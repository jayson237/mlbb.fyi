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

  const set = await prisma.user.update({
    where: {
      id: currentUser?.id,
    },
    data: {
      favourite: {
        push: postId,
      },
    },
  });

  if (!set)
    return NextResponse.json(
      {
        message: "Error editing post. Please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Post has been set to starred",
    },
    {
      status: 200,
    }
  );
}
