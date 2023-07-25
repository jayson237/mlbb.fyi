import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const { img }: { img: string } = await req.body;
    console.log(img);

    const set = await prisma.user.update({
      where: {
        id: id as string,
      },
      data: {
        image: img,
      },
    });

    return res.status(200).json(set);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Unable to retrieve picture", error });
  }
}
