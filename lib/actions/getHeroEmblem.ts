export default async function getHeroEmblem(heroId: string) {
  try {
    const get = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/emblem?heroId=${heroId}`,
      {
        method: "GET",
      }
    );
    const res = await get.json();
    return res;
  } catch (error) {
    return null;
  }
}
