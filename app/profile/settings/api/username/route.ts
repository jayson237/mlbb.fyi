import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const { username } = await req.json();

  const findUsername = await prisma.user.findFirst({
    where: {
      username,
    },
  });
  if (findUsername)
    return NextResponse.json(
      {
        message: "Username already exists",
      },
      {
        status: 400,
      }
    );

  const set = await prisma.user.update({
    where: {
      email: currentUser?.email,
    },
    data: {
      username: username,
    },
  });
  if (!set)
    return NextResponse.json(
      {
        message: "Error set Username",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Successfully set Username",
    },
    {
      status: 200,
    }
  );
}
