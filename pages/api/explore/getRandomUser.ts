import prisma from "@/lib/prismadb";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { NextApiRequest, NextApiResponse } from "next";

const skipGenerator = (total: number) => {
  return Math.floor((Math.random() * total) / 2) + 1;
};

export default async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const currentUser = await getCurrentUser();
    const usersCount = await prisma.user.count();

    const skip = skipGenerator(usersCount);
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: {
            in: [
              ...(currentUser?.id ? [currentUser.id] : []),
              ...(currentUser?.following || []),
            ],
          },
        },
        username: {
          not: null,
        },
      },
      take: 5,
      skip: skip,
      orderBy: {
        name: "desc",
      },
    });
    const debug = {
      users: users,
      skip: skip,
    };

    return res.status(200).json(debug);
  } catch (error) {
    return res.status(400).json({
      message: "Unable to generate random users",
      error,
    });
  }
}
