import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = req.url as string;
    const type = url.split("?type=")[1].split("&")[0];
    const username = url.split("&username=")[1];

    if (type === "following") {
      const data: {
        name: string | undefined;
        username: string | undefined;
        image: string | undefined;
      }[] = [];
      const user = await prisma.user.findFirst({
        where: {
          username: username,
        },
        select: {
          following: true,
        },
      });

      const followingIds = user?.following ?? [];

      if (followingIds.length === 0) {
        return NextResponse.json(data, { status: 200 });
      }

      const users = await prisma.user.findMany({
        where: {
          id: { in: followingIds },
        },
        select: {
          name: true,
          username: true,
          image: true,
        },
      });

      data.push(
        ...users.map((user) => ({
          name: user.name ?? undefined,
          username: user.username ?? undefined,
          image: user.image ?? undefined,
        }))
      );

      return NextResponse.json(data, { status: 200 });
    } else if (type === "followers") {
      const data: {
        name: string | undefined;
        username: string | undefined;
        image: string | undefined;
      }[] = [];
      const user = await prisma.user.findFirst({
        where: {
          username: username,
        },
        select: {
          followers: true,
        },
      });

      const followerIds = user?.followers ?? [];

      if (followerIds.length === 0) {
        return NextResponse.json(data, { status: 200 });
      }

      const users = await prisma.user.findMany({
        where: {
          id: { in: followerIds },
        },
        select: {
          name: true,
          username: true,
          image: true,
        },
      });

      data.push(
        ...users.map((user) => ({
          name: user.name ?? undefined,
          username: user.username ?? undefined,
          image: user.image ?? undefined,
        }))
      );

      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json("", {
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
