// @ts-nocheck

import { SpellsModel } from "@/lib/model/spell.model";
import { HeroModel } from "lib/model/hero.model";
import clientPromise from "lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  const { method } = req;
  const { heroId } = req.query;
  // console.log(heroId);

  await clientPromise;
  await SpellsModel.init();

  // switch (method) {
  //   case "GET":
  try {
    if (heroId) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).json({
        message: "success",
        data: await SpellsModel.findOne({ heroId }).populate({
          path: "spells",
          select: "-_id",
        }),
      });
    }
    const get = await SpellsModel.find().populate({
      path: "spells",
      select: "-_id",
    });

    return res.status(200).json({
      message: "success",
      data: get,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }

  // default:
  //   res.setHeader("Allow", ["GET"]);
  //   return res.status(405).json({
  //     message: `Method ${method} Not Allowed`,
  //   });
  // }
}
