import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  //console.log(currentUser?.name);

  const { username }: { username: string } = await req.json();
  //console.log("username", username);

  const findUsername = await prisma.user.findFirst({
    where: {
      username: username.toLowerCase(),
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
      username: username.toLowerCase(),
    },
  });
  if (!set)
    return NextResponse.json(
      {
        message: "Error setting username",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message:
        "Successfully set username, kindly wait before making more username updates",
    },
    {
      status: 200,
    }
  );
}
