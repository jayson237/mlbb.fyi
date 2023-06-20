// @ts-nocheck

import { CounterModel } from "@/lib/model/counter.model";
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
  await CounterModel.init();
  await HeroModel.init();

  // switch (method) {
  //   case "GET":
  try {
    if (heroId) {
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(200).json({
        message: "success",
        data: await CounterModel.findOne({ heroId }).populate({
          path: "counters",
          select: "-_id",
        }),
      });
    }
    const get = await CounterModel.find().populate({
      path: "counters",
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
