import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const currentUser = await getCurrentUser();
  const productsCount = await prisma.user.count();
  const skip = Math.floor(Math.random() * Math.min(productsCount - 1, 100));
  console.log(skip);

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
    // console.log(users);
    return NextResponse.json(users, {
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
