import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();
  const usersCount = await prisma.user.count();
  const maxSkipValue = Math.max(usersCount - 1, 0);
  let skip = Math.floor(Math.random() * Math.min(maxSkipValue, 10));

  if (skip >= usersCount) {
    skip = 5;
  }

  try {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: {
            in: [
              ...(currentUser?.id ? [currentUser.id] : []),
              ...(currentUser?.following || []),
            ],
          },
        },
        username: {
          not: null,
        },
      },
      take: 5,
      skip: skip,
      orderBy: {
        name: "desc",
      },
    });
    const debug = {
      users: users,
      skip: skip,
    };
    return NextResponse.json(debug, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Unable to generate random users",
        error,
      },
      {
        status: 400,
      }
    );
  }
}
