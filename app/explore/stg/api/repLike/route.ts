import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const { replyId }: { replyId: string } = await req.json();

  if (!currentUser) {
    return NextResponse.json(
      {
        message: "Please log in first",
      },
      {
        status: 400,
      }
    );
  }

  const hasLiked = await prisma.reply.findFirst({
    where: {
      id: replyId,
    },
  });

  if (!replyId || !hasLiked) {
    return NextResponse.json(
      {
        message: "Reply not found",
      },
      {
        status: 400,
      }
    );
  }

  if (hasLiked && !hasLiked.likes.includes(currentUser.id as string)) {
    const set = await prisma.reply.update({
      where: {
        id: replyId,
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
          message: "Error upvoting reply. Please try again",
        },
        {
          status: 400,
        }
      );

    if (hasLiked.dislikes.includes(currentUser?.id as string)) {
      const updatedDislikes = hasLiked.dislikes.filter(
        (id) => id !== currentUser.id
      );

      const setCurrentDislikes = await prisma.reply.update({
        where: {
          id: replyId,
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

      const addVotes = await prisma.reply.update({
        where: {
          id: replyId,
        },
        data: {
          totalVotes: {
            increment: 2,
          },
        },
      });

      if (!addVotes)
        return NextResponse.json(
          {
            message: "Error occured. Please try again",
          },
          {
            status: 400,
          }
        );

      return NextResponse.json(
        {
          message: "Reply has been upvotted",
        },
        {
          status: 200,
        }
      );
    }

    const addVotes = await prisma.reply.update({
      where: {
        id: replyId,
      },
      data: {
        totalVotes: {
          increment: 1,
        },
      },
    });

    if (!addVotes)
      return NextResponse.json(
        {
          message: "Error occured. Please try again",
        },
        {
          status: 400,
        }
      );

    return NextResponse.json(
      {
        message: "Reply has been upvotted",
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

  const setCurrentLikes = await prisma.reply.update({
    where: {
      id: replyId,
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

  const decreaseVotes = await prisma.reply.update({
    where: {
      id: replyId,
    },
    data: {
      totalVotes: {
        decrement: 1,
      },
    },
  });

  if (!decreaseVotes)
    return NextResponse.json(
      {
        message: "Error occured. Please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Upvote has been removed.",
    },
    {
      status: 200,
    }
  );
}
