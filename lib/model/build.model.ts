import mongoose, { Schema, model, models } from "mongoose";
import { IHero } from "./hero.model";

export interface IItem {
  name: string;
  desc: string;
  img: string;
  category: string;
  attribute: string[];
}

export interface IBuild {
  heroId: IHero;
  items: IItem[];
}

const ItemSchema = new Schema<IItem>(
  {
    name: String,
    desc: String,
    img: String,
    category: String,
  },
  {
    collection: "Item",
  }
);

const BuildSchema = new Schema<IBuild>(
  {
    heroId: {
      type: mongoose.Types.ObjectId,
      ref: "Hero",
    },
    items: [{
      type: mongoose.Types.ObjectId,
      ref: "Item",
    },]
  },
  {
    collection: "Build",
  }
);

export const ItemModel = models.Item || model("Item", ItemSchema);
export const BuildModel = models.Build || model<IBuild>("Build", BuildSchema);
