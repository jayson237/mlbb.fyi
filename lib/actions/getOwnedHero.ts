import axios from "axios";

export default async function getOwnedHero(accId: number) {
  try {
    const owned = await axios.get(
      `${process.env.BE_API_URL}/hero/owned?accId=${accId}`
    );
    const data = await owned.data.data;

    return data;
  } catch (error) {
    return null;
  }
}
