import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const getUrl = request.url.split("profile/")[1];
    const id = getUrl.split("/api")[0];
    //console.log(id);
    if (!id)
      return NextResponse.json(
        {
          msg: "ID Required",
        },
        { status: 400 }
      );

    const findID = await prisma.mlbbAcc.findFirst({
      where: {
        accId: id,
      },
    });
    if (!findID)
      return NextResponse.json(
        {
          msg: "MLBB ID's not found",
        },
        { status: 400 }
      );

    const emailAcc = await prisma.user.findFirst({
      where: {
        id: findID.userId as string,
      },
    });

    return NextResponse.json(
      {
        email: emailAcc?.email,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        msg: "An error occured",
      },
      { status: 400 }
    );
  }
}
