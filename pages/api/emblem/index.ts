// @ts-nocheck

import { EmblemsModel } from "@/lib/model/emblem.model";
import { HeroModel } from "lib/model/hero.model";
import clientPromise from "lib/mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function get(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  const { method } = req;
  const { heroId } = req.query;

  await clientPromise;
  await EmblemsModel.init();

  try {
    if (heroId) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).json({
        message: "success",
        data: await EmblemsModel.findOne({ heroId }).populate({
          path: "emblems",
          select: "-_id",
        }),
      });
    }
    const get = await EmblemsModel.find().populate({
      path: "emblems",
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
}
