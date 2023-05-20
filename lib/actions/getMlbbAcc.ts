import prisma from "@/lib/prismadb";

export default async function getMlbbAcc(email?: string) {
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const findMlbbAcc = await prisma.mlbbaccs.findFirst({
      where: {
        userId: findUser?.id,
      },
      // select: {
      //   accId: true,
      //   accServer: true,
      //   accAvatar: true,
      //   accLevel: true,
      //   nickname: true,
      // },
    });

    return findMlbbAcc;
  } catch (error) {
    return null;
  }
}
