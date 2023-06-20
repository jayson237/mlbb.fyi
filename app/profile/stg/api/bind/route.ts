import { NextResponse } from "next/server";

import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import { bindAcc } from "@/lib/utils";
import prisma from "@/lib/prismadb";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email)
    return NextResponse.json(
      { message: "Please sign in first" },
      {
        status: 400,
      }
    );
  try {
    const mlbbAcc = await getMlbbAcc(email);

    return NextResponse.json(
      {
        email,
        accId: mlbbAcc?.accId,
        nickname: mlbbAcc?.nickname,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "An error has occured" },
      { status: 400 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { accServer, accId, code, email } = await request.json();
    if (!accServer || !accId || !code) {
      return NextResponse.json(
        {
          message: "Please ensure that all the necessary fields are completed",
        },
        { status: 400 }
      );
    }

    const bind = await bindAcc({ accId, accServer, code });
    // console.log("bind.data.id", bind.data.id);
    // console.log("bind.data.server", bind.data.server);
    // console.log("bind.data.nickname", bind.data.nickname);
    const create = await prisma?.mlbbAcc.create({
      data: {
        accId: bind.data.id,
        accServer: bind?.data?.server,
        nickname: bind?.data?.nickname,
      },
    });
    // console.log(create);

    const update = await prisma?.user.update({
      where: {
        email,
      },
      data: {
        mlbbaccs: {
          connect: {
            accId,
          },
        },
      },
    });
    // console.log(update);

    if (!bind.data) {
      return NextResponse.json(
        {
          message: bind.message,
        },
        { status: 400 }
      );
    }

    const upt = await fetch(
      `${process.env.BE_API_URL}/data/sync?accId=${accId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.BE_API_SECRET}`,
        },
      }
    );
    // console.log(upt.status);
    if (upt.ok) {
      return NextResponse.json(
        {
          message: "Successfully sync your Mobile Legends account",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "Successfully bound but failed to sync your data to profile",
      },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occured, please try again later",
        stack: error,
      },
      { status: 400 }
    );
  }
}
