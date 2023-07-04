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

  const hasLiked = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (hasLiked && !hasLiked.likes.includes(currentUser.id as string)) {
    const set = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        likes: {
          push: currentUser.id,
        },
      },
    });

    if (!set)
      return NextResponse.json(
        {
          message: "Error upvoting post. Please try again",
        },
        {
          status: 400,
        }
      );

    const updatedDislikes = hasLiked.dislikes.filter(
      (id) => id !== currentUser.id
    );

    const setCurrentDislikes = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        dislikes: updatedDislikes,
      },
    });

    if (!setCurrentDislikes)
      return NextResponse.json(
        {
          message: "Error occurred. Please try again",
        },
        {
          status: 400,
        }
      );

    return NextResponse.json(
      {
        message: "Post has been set been upvotted",
      },
      {
        status: 200,
      }
    );
  }

  const updatedLikes = hasLiked?.likes.filter((id) => id !== currentUser.id);

  if (!updatedLikes) {
    return NextResponse.json(
      {
        message: "Error occured. Please try again",
      },
      {
        status: 400,
      }
    );
  }

  const setCurrentLikes = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likes: updatedLikes,
    },
  });

  if (!setCurrentLikes)
    return NextResponse.json(
      {
        message: "Error removing upvote. Please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Upvote has been removed",
    },
    {
      status: 200,
    }
  );
}
