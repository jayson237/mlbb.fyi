import mongoose, { Schema, model, models } from "mongoose";
import { IHero } from "./hero.model";

export interface ICounter {
  heroId: IHero;
  counters: IHero[];
}

const CounterSchema = new Schema<ICounter>(
  {
    heroId: {
      type: mongoose.Types.ObjectId,
      ref: "Hero",
    },
    counters: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Hero",
      },
    ],
  },
  {
    collection: "Counter",
  }
);

export const CounterModel =
  models.Counter || model<ICounter>("Counter", CounterSchema);
