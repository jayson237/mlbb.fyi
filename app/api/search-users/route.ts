import prisma from "@/lib/prismadb";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(
  req: Request
): Promise<NextResponse<string | User[] | { message: string } | null>> {
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
