import { NextResponse } from "next/server";

import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import { bindAcc } from "@/lib/utils";

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
    const user = await prisma?.user.findFirst({
      where: {
        email,
      },
    });
    await prisma?.mlbbAcc.create({
      data: {
        accId: bind.data.id,
        accServer: bind.data.server,
        nickname: bind.data.nickname,
        userId: user?.id || "",
      },
    });

    if (!bind.data) {
      return NextResponse.json(
        {
          message: bind.message,
        },
        { status: 400 }
      );
    }
    // const save = await prisma?.mlbbAcc.create({
    //   data: {
    //     accId: bind.data.id
    //   }
    // })
    const upt = await fetch(
      `${process.env.BE_API_URL}/data/sync?accId=${accId}`,
      {
        method: "GET",
      }
    );
    if (upt.ok) {
      return NextResponse.json(
        {
          message: bind.message,
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
        message: "Error, your account might have been bound before",
      },
      { status: 400 }
    );
  }
}
