import mongoose, { Schema, model, models } from "mongoose";
import { IHero } from "./hero.model";

export interface ISpell {
  heroId: IHero;
  name: string;
  desc: string;
  img: string;
  cd: string;
  details: string[];
}

const SpellSchema = new mongoose.Schema(
  {
    heroId: {
      type: mongoose.Types.ObjectId,
      ref: "Hero",
    },
    name: String,
    desc: String,
    img: String,
    cd: String,
  },
  {
    collection: "Spell",
  }
);

export const SpellModel = models.Spell || model("Spell", SpellSchema);
