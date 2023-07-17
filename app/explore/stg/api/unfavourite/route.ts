import getCurrentPost from "@/lib/actions/getCurrentPost";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const { postId }: { postId: string } = await req.json();
  const post = await getCurrentPost(postId);

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

  const updatedFavourite = currentUser.favourite.filter((id) => id !== postId);

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
}
