export default async function getHeroCorr(heroId: string) {
  try {
    const get = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/corresponding?heroId=${heroId}`,
      {
        method: "GET",
      }
    );
    const res = await get.json();
    return res;
  } catch (error) {
    console.log("Error", error);
    return null;
  }
}
