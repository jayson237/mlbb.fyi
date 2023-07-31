import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getCurrentPost from "@/lib/actions/getCurrentPost";

export async function POST(req: Request) {
  const { postId }: { postId: string } = await req.json();
  const { searchParams } = new URL(req.url);
  const action = searchParams.get("action");

  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json(
        {
          message: "Pleese log in first",
        },
        {
          status: 400,
        }
      );
    }

    const post = await getCurrentPost(postId);

    if (!post) {
      return NextResponse.json(
        {
          message: "Post not found",
        },
        {
          status: 400,
        }
      );
    }

    if (action === "favourite") {
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

      const setPost = await prisma.post.update({
        where: {
          id: postId,
        },
        data: {
          favourites: {
            push: currentUser.id,
          },
        },
      });

      if (!setPost)
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
          message: "Post has been saved to favourites",
        },
        {
          status: 200,
        }
      );
    }

    const updatedFavourite = currentUser.favourite.filter(
      (id) => id !== postId
    );

    const updatedPostFavourite = post.favourites.filter(
      (id) => id !== currentUser.id
    );

    const setCurrentFavourites = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favourite: updatedFavourite,
      },
    });

    if (!setCurrentFavourites) {
      return NextResponse.json(
        {
          message: "Failed to unfavourite, please try again",
        },
        { status: 400 }
      );
    }

    const setPost = await prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        favourites: updatedPostFavourite,
      },
    });

    return NextResponse.json(
      {
        message: "Post has been removed from favourites",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 400 });
  }
}
