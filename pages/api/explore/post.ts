import prisma from "@/lib/prismadb";
import { NextApiRequest, NextApiResponse } from "next";

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    const {
      title,
      message,
      image,
      tags,
    }: { title: string; message: string; image: string; tags: string[] } =
      await req.body;

    const currentPost = await prisma.post.findFirst({
      where: {
        title: title,
        userId: id as string,
      },
    });

    if (currentPost) {
      return res.status(400).json({
        message: "You have already have that title. Please use another title.",
      });
    }

    if (tags.indexOf("") !== -1) {
      return res.status(400).json({
        message: "Invalid tag('') spotted",
      });
    }

    for (const x of tags as string[]) {
      if (x.length >= 20) {
        return res.status(400).json({
          message: `Tag '${x}' exceeded word count`,
        });
      }
    }

    const set = await prisma.user.update({
      where: {
        id: id as string,
      },
      data: {
        posts: {
          create: {
            title: title,
            body: message,
            image: image,
            tags: tags,
          },
        },
      },
    });

    if (set)
      return res.status(200).json({
        message: "Successful! Please wait for to be redirected",
      });
    return res
      .status(400)
      .json({ message: "Error posting post. Please try again" });
  } catch (error) {
    return res.status(400).json({ message: "Error:", error });
  }
}
