import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = req.url as string;
    const type = url.split("?type=")[1].split("&")[0];
    const username = url.split("&username=")[1];

    if (type === "following") {
      let data: {
        name: string | undefined
        username: string | undefined
      }[] = [];
      const user = await prisma.user.findFirst({
        where: {
          username: username,
        },
        select: {
          following: true,
        },
      });

      for (const x of user?.following as string[]){
        await prisma.user.findFirst({
          where: {
            id: x,
          },
          select: {
            name: true,
            username: true,
            image: true
          },
        }).then((res) => {
          // @ts-ignore
          return data.push(res);
        })
      }
      return NextResponse.json(data, {status: 200})
    }
    else if (type === "followers") {
      let data: {
        name: string | undefined
        username: string | undefined
        image: string | undefined
      }[] = [];
      const user = await prisma.user.findFirst({
        where: {
          username: username,
        },
        select: {
          followers: true,
        },
      });

      for (const x of user?.followers as string[]){
        await prisma.user.findFirst({
          where: {
            id: x,
          },
          select: {
            name: true,
            username: true,
            image: true
          },
        }).then((res) => {
          // @ts-ignore
          return data.push(res);
        })
      }
      return NextResponse.json(data, {status: 200})
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
