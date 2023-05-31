import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const { username }: { username: string } = await req.json();

  const findUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!currentUser) {
    return NextResponse.json(
      {
        message: "Please sign in first",
      },
      {
        status: 400,
      }
    );
  }

  if (!findUser) {
    return NextResponse.json(
      {
        message: "User does not exist",
      },
      {
        status: 400,
      }
    );
  }

  const setCurrentFollowings = await prisma.user.update({
    where: {
      email: currentUser?.email,
    },
    data: {
      following: {
        disconnect: { id: findUser.id },
      },
    },
  });

  if (!setCurrentFollowings) {
    return NextResponse.json(
      {
        message: "Failed to unfollow, please try again",
      },
      { status: 400 }
    );
  }

  const setUserFollowers = await prisma.user.update({
    where: {
      email: findUser?.email,
    },
    data: {
      followers: {
        disconnect: { id: currentUser.id },
      },
    },
  });

  if (!setUserFollowers) {
    return NextResponse.json(
      {
        message: "Failed to set user's followers",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Successful" }, { status: 200 });
}
