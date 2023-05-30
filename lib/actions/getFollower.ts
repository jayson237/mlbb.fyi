import prisma from "@/lib/prismadb";

export default async function getFollowers(email?: string) {
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const findFollowers = await prisma.follower.findMany({
      where: {
        userId: findUser?.id,
      },
    });

    return findFollowers;
  } catch (error) {
    return null;
  }
}
