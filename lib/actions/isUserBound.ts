import getMlbbAcc from "./getMlbbAcc";
import prisma from "@/lib/prismadb";

export default async function isUserBound(username: string) {
  try {
    const get = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    const mlbbAcc = await getMlbbAcc(get?.email || "");
    return mlbbAcc;
  } catch (error) {
    return null;
  }
}
