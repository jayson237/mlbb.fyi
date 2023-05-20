import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const find = await prisma?.mlbbaccs.findFirst({
      where: {
        userId: "642e7c810f3e7647f4ba3596",
      },
    });
    console.log(find);

    // const findAndUpdate = await prisma?.user.update({
    //   where: {
    //     email: "jaysonng3@gmail.com",
    //   },
    //   data: {
    //     mlbbaccs: {
    //       connect: {
    //         accId: "164463862",
    //       },
    //     },
    //   },
    // });

    // console.log(findAndUpdate);
  } catch (error) {
    return NextResponse.json(
      {
        msg: "err",
      },
      { status: 400 }
    );
  }
}
