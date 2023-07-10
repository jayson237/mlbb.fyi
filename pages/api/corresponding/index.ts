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

  await clientPromise;
  await CounterModel.init();
  await HeroModel.init();

  try {
    if (heroId) {
      res.setHeader("Access-Control-Allow-Origin", "*");

      const counters = await CounterModel.find({
        counters: { $in: [heroId] },
      }).populate("heroId");

      return res.status(200).json({
        message: "success",
        data: counters,
      });
    }

    // If no heroId is provided, return all counters with their populated counters field
    const counters = await CounterModel.find().populate("counters", "-_id");

    return res.status(200).json({
      message: "success",
      data: counters,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
}
