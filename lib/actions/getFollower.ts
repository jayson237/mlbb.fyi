import prisma from "@/lib/prismadb";

export default async function getFollowers(email?: string) {
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const findFollowers = await prisma.user.findMany({
      where: {
        id: findUser?.id,
      },
    });

    return findFollowers;
  } catch (error) {
    return null;
  }
}
