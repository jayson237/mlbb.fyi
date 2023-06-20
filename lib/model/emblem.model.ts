import mongoose, { Schema, model, models } from "mongoose";
import { IHero } from "./hero.model";

export interface IEmblem {
  name: string;
  img: string;
}

export interface IEmblems {
  heroId: IHero;
  emblems: IEmblem[];
}

const EmblemSchema = new Schema<IEmblem>(
  {
    name: String,
    img: String,
  },
  {
    collection: "Emblem",
  }
);

const EmblemsSchema = new Schema<IEmblems>(
  {
    heroId: {
      type: mongoose.Types.ObjectId,
      ref: "Hero",
    },
    emblems: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Emblem",
      },
    ],
  },
  {
    collection: "Emblems",
  }
);

export const EmblemModel = models.Emblem || model("Emblem", EmblemSchema);
export const EmblemsModel =
  models.Emblems || model<IEmblems>("Emblems", EmblemsSchema);
