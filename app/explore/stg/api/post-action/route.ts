import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/actions/getCurrentUser";

export async function POST(req: Request) {
  const { postId }: { postId: string } = await req.json();
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  try {
    const currentUser = await getCurrentUser();

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

    // Find Single Post
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

    const Obj = { likes: post.likes, dislikes: post.dislikes };

    // Like
    if (action === "like") {
      // If user doesn't like the post
      if (!post.likes.includes(currentUser.id as string)) {
        Obj.likes = [...Obj.likes, currentUser.id];
        if (post.dislikes.includes(currentUser?.id as string)) {
          const updatedDislikes = post.dislikes.filter(
            (id) => id !== currentUser.id
          );
          Obj.dislikes = [...updatedDislikes];

          await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              ...Obj,
            },
          });
          return NextResponse.json(
            {
              message: "Post has been upvotted",
            },
            {
              status: 200,
            }
          );
        } else {
          await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              ...Obj,
            },
          });
          return NextResponse.json(
            {
              message: "Post has been upvotted.",
            },
            {
              status: 200,
            }
          );
        }
      }

      // If user like the post, then we remove user from list
      else {
        const updatedLikes = post?.likes.filter((id) => id !== currentUser.id);
        Obj.likes = updatedLikes;
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            ...Obj,
          },
        });

        return NextResponse.json(
          {
            message: "Remove upvotted.",
          },
          {
            status: 200,
          }
        );
      }
    }

    // Dislike
    else if (action === "dislike") {
      // If user doesn't dislike the post
      if (!post.dislikes.includes(currentUser.id as string)) {
        Obj.dislikes = [...Obj.dislikes, currentUser.id];
        if (post.likes.includes(currentUser?.id as string)) {
          const updatedLikes = post.likes.filter((id) => id !== currentUser.id);
          Obj.likes = [...updatedLikes];

          await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              ...Obj,
            },
          });
          return NextResponse.json(
            {
              message: "Post has been downvotted",
            },
            {
              status: 200,
            }
          );
        } else {
          await prisma.post.update({
            where: {
              id: postId,
            },
            data: {
              ...Obj,
            },
          });
          return NextResponse.json(
            {
              message: "Post has been downvotted.",
            },
            {
              status: 200,
            }
          );
        }
      }

      // If user dislike the post, then we remove user from list
      else {
        const updatedDisikes = post.dislikes.filter(
          (id) => id !== currentUser.id
        );
        Obj.dislikes = updatedDisikes;
        await prisma.post.update({
          where: {
            id: postId,
          },
          data: {
            ...Obj,
          },
        });

        return NextResponse.json(
          {
            message: "Remove downvotted.",
          },
          {
            status: 200,
          }
        );
      }
    }
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
