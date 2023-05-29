import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();
  //console.log(currentUser?.name);

  const { username, description }: { username: string; description: string } =
    await req.json();
  //console.log("username", username);

  const findUsername = await prisma.user.findFirst({
    where: {
      username: username.toLowerCase(),
    },
  });

  if (findUsername && description === currentUser?.desc)
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
      desc: description,
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
      message: "Successful, kindly wait before making more updates",
    },
    {
      status: 200,
    }
  );
}
