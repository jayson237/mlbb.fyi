import { NextResponse } from "next/server";

import { sendVerificationCode } from "@/lib/utils";

export async function POST(request: Request) {
  try {
    const { accServer, accId } = await request.json();
    if (!accServer || !accId) {
      return NextResponse.json(
        {
          message: "Invalid ID or Server",
        },
        { status: 400 }
      );
    }

    const sendCode = await sendVerificationCode({ accServer, accId });

    if (sendCode.status !== 200) {
      return NextResponse.json(
        {
          message: "Invalid ID or Server",
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      {
        message: "Kindly check your Mobile Legends inbox for the code",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occured",
      },
      { status: 400 }
    );
  }
}
