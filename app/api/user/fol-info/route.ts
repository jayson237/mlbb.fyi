// @ts-nocheck
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  try {
    const type = searchParams.get("type");
    const username = searchParams.get("username");

    if (type === "following") {
      let data: {
        name: string | undefined;
        username: string | undefined;
      }[] = [];
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
        select: {
          following: true,
        },
      });


      for (const x of user?.following as string[]) {
        await prisma.user
          .findFirst({
            where: {
              id: x,
            },
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          })
          .then((res) => {
            // @ts-ignore
            return data.push(res);
          });
      }
      return NextResponse.json(data, { status: 200 });
    } else if (type === "followers") {
      let data: {
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

      for (const x of user?.followers as string[]) {
        await prisma.user
          .findFirst({
            where: {
              id: x,
            },
            select: {
              id: true,
              name: true,
              username: true,
              image: true,
            },
          })
          .then((res) => {
            // @ts-ignore
            return data.push(res);
          });
      }
      return NextResponse.json(data, { status: 200 });
    }

    return NextResponse.json("", {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: "User not found!",
        error,
      },
      {
        status: 400,
      }
    );
  }
}
