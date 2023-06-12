// @ts-nocheck

import { BuildModel } from "lib/model/build.model";
import { HeroModel } from "lib/model/hero.model";
import clientPromise from "lib/mongoose";
import mongoose, { Mongoose, ObjectId, mongo } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  const { method } = req;
  const { hero, choice1, choice2, choice3, choice4, choice5, choice6 } =
    await req.body;

  await clientPromise;
  await BuildModel.init();

  switch (method) {
    case "POST":
      try {
        const items = [
          choice1,
          choice2,
          choice3,
          choice4,
          choice5,
          choice6,
        ]

        const set = await BuildModel.create({
          heroId: hero,
          items
        });

        return res.status(200).json({
          message: "success",
          data: set,
        });
      } catch (err) {
        return res.status(400).json({
          message: err.message,
        });
      }

    default:
      res.setHeader("Allow", ["POST"]);
      return res.status(405).json({
        message: `Method ${method} Not Allowed`,
      });
  }
}
