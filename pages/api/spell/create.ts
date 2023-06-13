// @ts-nocheck

import { SpellsModel } from "@/lib/model/spell.model";
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
  await SpellsModel.init();

  switch (method) {
    case "POST":
      try {
        const spells = [choice1, choice2];

        const set = await SpellsModel.create({
          heroId: hero,
          spells: spells,
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
