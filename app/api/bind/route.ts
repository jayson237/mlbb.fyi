import { NextResponse } from "next/server";

import { bindAcc } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const { accServer, accId, code, email } = await request.json();
    if (!accServer || !accId || !code) {
      return NextResponse.json({}, { status: 400 });
    }

    const bind = await bindAcc({ accServer, accId, code });
    console.log(bind);

    const findAndUpdate = await prisma?.user.update({
      where: {
        email: email,
      },
      data: {
        mlbbaccs: {
          connect: {
            accId: accId,
          },
        },
      },
    });

    console.log(findAndUpdate);

    if (bind.status !== 200) {
      return NextResponse.json(
        {
          message: bind.data.message,
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: bind.data.message,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({}, { status: 400 });
  }
}
