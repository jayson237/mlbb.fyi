export default async function getHeroCounter(heroId: string) {
  try {
    const get = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/counter?heroId=${heroId}`,
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
