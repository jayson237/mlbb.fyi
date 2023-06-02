import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = req.url as string;
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

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      select: {
        name: true,
        username: true,
        followers: true,
        following: true,
        desc: true,
      },
    });

    if (!currentUser) {
      return NextResponse.json({
        msg: "Error",
      });
    }

    return NextResponse.json(currentUser, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "User not found!",
      },
      {
        status: 400,
      }
    );
  }
}
