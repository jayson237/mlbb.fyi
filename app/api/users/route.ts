import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { data }: { data: string } = await req.json();

    if (data.includes(" ")) {
      return NextResponse.json("invalid", {
        status: 200,
      });
    }

    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!users) {
      return null;
    }

    if (data) {
      const filteredUsers = users?.filter((user) =>
        user.username ? user?.username.includes(data.toLowerCase()) : ""
      );

      if (filteredUsers.length !== 0) {
        return NextResponse.json(filteredUsers, {
          status: 200,
        });
      }

      return NextResponse.json("empty", {
        status: 200,
      });
    }

    return NextResponse.json("not searched", {
      status: 200,
    });
  } catch (error: any) {
    return null;
  }
}
