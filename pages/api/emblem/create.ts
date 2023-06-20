// @ts-nocheck

import { EmblemsModel } from "@/lib/model/emblem.model";
import { HeroModel } from "lib/model/hero.model";
import clientPromise from "lib/mongoose";
import mongoose, { Mongoose, ObjectId, mongo } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  const { method } = req;
  const { hero, choice1, choice2 } = await req.body;

  await clientPromise;
  await EmblemsModel.init();

  switch (method) {
    case "POST":
      try {
        const emblems = [choice1, choice2];

        const set = await EmblemsModel.create({
          heroId: hero,
          emblems: emblems,
        });

        return res.status(200).json({
          message: "success",
          data: set,
        });
      } catch (err) {
        // console.log("Error:", err);
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
