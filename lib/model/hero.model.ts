import { Schema, model, models } from "mongoose";

export interface IHeroSkill {
  name: string;
  icon: string;
  description: string;
  tips: string;
}

const HeroSkillSchema = new Schema<IHeroSkill>(
  {
    name: String,
    icon: String,
    description: String,
    tips: String,
  },
  { _id: false }
);

export interface IHero {
  name?: string;
  img?: string;
  heroId?: string;
  details?: {
    heroType?: string;
    heroName?: string;
    coverPicture?: string;
    galleryPicture?: string;
    ability?: string;
    offense?: string;
    durability?: string;
    difficulty?: string;
    skill?: IHeroSkill;
  };
}

const HeroSchema = new Schema<IHero>(
  {
    name: String,
    img: String,
    heroId: Number,
    details: {
      heroType: String,
      heroName: String,
      coverPicture: String,
      galleryPicture: String,
      ability: String,
      offense: String,
      durability: String,
      difficulty: String,
      skill: [HeroSkillSchema],
    },
  },
  {
    collection: "Hero",
  }
);

export const HeroModel = models.Hero || model("Hero", HeroSchema);