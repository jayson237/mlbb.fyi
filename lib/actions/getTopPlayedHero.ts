import axios from "axios";
import prisma from "@/lib/prismadb";

export interface ITopPlayed {
  id: string;
  name: string;
  total: number;
  win: number;
}

async function findHeroName(data: any) {
  return await prisma.heros.findFirst({
    where: {
      heroId: {
        in: [parseInt(data)],
      },
    },
    select: {
      name: true,
      details: {
        select: {
          heroType: true,
        },
      },
    },
  });
}

export default async function getTopPlayedHero(accId: number) {
  try {
    const fetch = await axios.get(
      `${process.env.BE_API_URL}/hero/winrate?accId=${accId}`
    );
    const classic = fetch.data.data[0].data;
    const ranked = fetch.data.data[1].data;

    //classic
    const classicDataSort = classic
      .sort((a: any, b: any) => b.total - a.total)
      .slice(0, 5);

    let topPlayedClass: any = [];
    for (const x in classicDataSort) {
      const find = await findHeroName(classicDataSort[x].id);
      topPlayedClass.push(find);
    }

    //rank
    const rankedDataSort = ranked
      .sort((a: any, b: any) => b.total - a.total)
      .slice(0, 5);

    const topPlayedRank: any = [];
    for (const x in rankedDataSort) {
      const find = await findHeroName(rankedDataSort[x].id);
      topPlayedRank.push(find);
    }

    //final
    const topPlayedClassic: ITopPlayed[] = await classicDataSort.map(
      (data: any, index: number) => {
        return {
          ...data,
          name: topPlayedClass[index].name,
        };
      }
    );
    const topPlayedRanked: ITopPlayed[] = await rankedDataSort.map(
      (data: any, index: number) => {
        return {
          ...data,
          name: topPlayedRank[index].name,
        };
      }
    );

    return { topPlayedClassic, topPlayedRanked };
  } catch (error) {
    return null;
  }
}
