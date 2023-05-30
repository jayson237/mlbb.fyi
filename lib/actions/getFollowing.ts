import prisma from "@/lib/prismadb";

export default async function getFollowings(email?: string) {
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const findFollowings = await prisma.following.findMany({
      where: {
        userId: findUser?.id,
      },
    });

    return findFollowings;
  } catch (error) {
    return null;
  }
}
