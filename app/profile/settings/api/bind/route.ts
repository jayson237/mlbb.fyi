import { NextResponse } from "next/server";

import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import { bindAcc } from "@/lib/utils";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email)
    return NextResponse.json(
      {},
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
    return NextResponse.json({}, { status: 400 });
  }
}

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
