import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request): Promise<
  NextResponse<{
    name: string | null;
    desc: string | null;
    username: string | null;
    followers: string[];
    following: string[];
  } | null>
> {
  const url = req.url as string;
  try {
    const username = url.split("?username=")[1];

    if (username) {
      return NextResponse.json(
        await prisma.user.findFirst({
          where: {
            username,
          },
          select: {
            name: true,
            username: true,
            followers: true,
            following: true,
            desc: true,
          },
        })
      );
    }

    const session = await getServerSession(authOptions);

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session?.user?.email as string,
      },
      select: {
        name: true,
        username: true,
        followers: true,
        following: true,
        desc: true,
      },
    });

    return NextResponse.json(currentUser, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        name: null,
        desc: null,
        username: null,
        followers: [],
        following: [],
      },
      {
        status: 400,
      }
    );
  }
}
