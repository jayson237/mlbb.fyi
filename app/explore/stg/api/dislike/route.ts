import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const { postId }: { postId: string } = await req.json();

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

  const hasDisliked = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!postId || !hasDisliked) {
    return NextResponse.json(
      {
        message: "Post not found",
      },
      {
        status: 400,
      }
    );
  }

  if (hasDisliked && !hasDisliked.dislikes.includes(currentUser.id as string)) {
    const set = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        dislikes: {
          push: currentUser.id,
        },
      },
    });

    if (!set)
      return NextResponse.json(
        {
          message: "Error downvoting post. Please try again",
        },
        {
          status: 400,
        }
      );

    if (hasDisliked.likes.includes(currentUser?.id as string)) {
      const updatedLikes = hasDisliked?.likes.filter(
        (id) => id !== currentUser.id
      );

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
            message: "Error occured. Please try again",
          },
          {
            status: 400,
          }
        );

      const decreaseVotes = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          totalVotes: {
            decrement: 2,
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
          message: "Post has been downvoted",
        },
        {
          status: 200,
        }
      );
    }

    const decreaseVotes = await prisma.post.update({
      where: {
        id: postId,
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
        message: "Post has been downvoted",
      },
      {
        status: 200,
      }
    );
  }

  const updatedDislikes = hasDisliked?.likes.filter(
    (id) => id !== currentUser.id
  );

  if (!updatedDislikes) {
    return NextResponse.json(
      {
        message: "Error occured. Please try again",
      },
      {
        status: 400,
      }
    );
  }

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
        message: "Error removing downvote. Please try again",
      },
      {
        status: 400,
      }
    );

  const addVotes = await prisma.post.update({
    where: {
      id: postId,
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
      message: "Downvote has been removed.",
    },
    {
      status: 200,
    }
  );
}
