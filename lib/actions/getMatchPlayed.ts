import axios from "axios";

export default async function getMatchPlayed(accId: number) {
  try {
    const fetch = await axios.get(
      `${process.env.BE_API_URL}/hero/winrate?accId=${accId}`
    );
    const classic = fetch.data.data[0].data;
    const ranked = fetch.data.data[1].data;

    let totalClassic = 0;
    for (const x in classic) {
      totalClassic += classic[x].total;
    }

    let totalRanked = 0;
    for (const x in ranked) {
      totalRanked += ranked[x].total;
    }

    return { totalClassic, totalRanked };
  } catch (error) {
    return null;
  }
}
