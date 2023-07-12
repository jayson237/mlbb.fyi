import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const find = await prisma?.mlbbAcc.findFirst({
      where: {
        userId: "642e7c810f3e7647f4ba3596",
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        msg: "An error occured",
      },
      { status: 400 }
    );
  }
}
