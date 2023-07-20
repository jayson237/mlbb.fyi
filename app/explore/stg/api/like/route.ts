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

  const post = await prisma.post.findFirst({
    where: {
      id: postId,
    },
  });

  if (!postId || !post) {
    return NextResponse.json(
      {
        message: "Post not found",
      },
      {
        status: 400,
      }
    );
  }

  if (post && !post.likes.includes(currentUser.id as string)) {
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

    if (post.dislikes.includes(currentUser?.id as string)) {
      const updatedDislikes = post.dislikes.filter(
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

      const addVotes = await prisma.post.update({
        where: {
          id: postId,
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
          message: "Post has been upvotted",
        },
        {
          status: 200,
        }
      );
    }

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
        message: "Post has been upvotted.",
      },
      {
        status: 200,
      }
    );
  }

  const updatedLikes = post?.likes.filter((id) => id !== currentUser.id);

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
      message: "Upvote has been removed.",
    },
    {
      status: 200,
    }
  );
}
