import prisma from "@/lib/prismadb";

export default async function getMlbbAcc(email?: string) {
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const findMlbbAcc = await prisma.mlbbAcc.findFirst({
      where: {
        userId: findUser?.id,
      },
    });

    return findMlbbAcc;
  } catch (error) {
    return null;
  }
}
