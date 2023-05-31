import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const { username } = await req.json();
  // console.log (username)

  const findUser = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  // console.log(currentUser?.username);
  // console.log(findUser?.username);

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

  const updatedFollowing = currentUser.following.filter(
    (id) => id !== findUser.id
  );

  const setCurrentFollowings = await prisma.user.update({
    where: {
      email: currentUser.email,
    },
    data: {
      following: updatedFollowing,
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

  const updatedFollowers = findUser.followers.filter(
    (id) => id !== currentUser.id
  );

  const setUserFollowers = await prisma.user.update({
    where: {
      email: findUser.email,
    },
    data: {
      followers: updatedFollowers,
    },
  });

  if (!setUserFollowers) {
    return NextResponse.json(
      {
        message: "Failed to remove user's follower",
      },
      { status: 400 }
    );
  }

  return NextResponse.json({ message: "Unfollow successful" }, { status: 200 });
}
