import mongoose, { Schema, model, models } from "mongoose";
import { IHero } from "./hero.model";

export interface ISpell {
  name: string;
  desc: string;
  img: string;
  cd: string;
}

export interface ISpells {
  heroId: IHero;
  spells: ISpell[];
}

const SpellSchema = new Schema<ISpell>(
  {
    name: String,
    desc: String,
    img: String,
    cd: String,
  },
  {
    collection: "Spell",
  }
);

const SpellsSchema = new Schema<ISpells>(
  {
    heroId: {
      type: mongoose.Types.ObjectId,
      ref: "Hero",
    },
    spells: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Spell",
      },
    ],
  },
  {
    collection: "Spells",
  }
);

export const SpellModel = models.Spell || model("Spell", SpellSchema);
export const SpellsModel =
  models.Spells || model<ISpells>("Spells", SpellsSchema);
