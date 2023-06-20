import prisma from "@/lib/prismadb";

export default async function getUser(username: string) {
  return await prisma.user.findFirst({
    where: {
      username,
    },
  });
}
