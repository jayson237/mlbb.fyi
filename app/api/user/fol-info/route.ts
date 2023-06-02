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

      for (const x of user?.following as string[]) {
        const res = await prisma.user.findFirst({
          where: {
            id: x,
          },
          select: {
            name: true,
            username: true,
            image: true,
          },
        });

        if (res !== null) {
          const { name, username, image } = res;
          data.push({
            name: name !== null ? name : undefined,
            username: username !== null ? username : undefined,
            image: image !== null ? image : undefined,
          });
        }
      }
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

      for (const x of user?.followers as string[]) {
        const res = await prisma.user.findFirst({
          where: {
            id: x,
          },
          select: {
            name: true,
            username: true,
            image: true,
          },
        });

        if (res !== null) {
          const { name, username, image } = res;
          data.push({
            name: name !== null ? name : undefined,
            username: username !== null ? username : undefined,
            image: image !== null ? image : undefined,
          });
        }
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
      },
      {
        status: 400,
      }
    );
  }
}
