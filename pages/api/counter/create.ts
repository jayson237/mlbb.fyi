// @ts-nocheck

import { CounterModel } from "@/lib/model/counter.model";
import { HeroModel } from "lib/model/hero.model";
import clientPromise from "lib/mongoose";
import mongoose, { Mongoose, ObjectId, mongo } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<any> {
  const { method } = req;
  const { hero, choice1 } = await req.body;

  await clientPromise;
  await CounterModel.init();

  switch (method) {
    case "POST":
      try {
        const existingCounter = await CounterModel.findOne({ heroId: hero });

        if (existingCounter) {
          // If a counter already exists for the given heroId, add the new counter
          existingCounter.counters.push(choice1);
          await existingCounter.save();

          return res.status(200).json({
            message: "success",
            data: existingCounter,
          });
        } else {
          // If no counter exists for the given heroId, create a new counter
          const counters = [choice1];
          const newCounter = await CounterModel.create({
            heroId: hero,
            counters: counters,
          });

          return res.status(200).json({
            message: "success",
            data: newCounter,
          });
        }
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
