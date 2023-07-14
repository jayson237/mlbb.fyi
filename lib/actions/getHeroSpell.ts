export default async function getHeroSpell(heroId: string) {
  try {
    const get = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/spell?heroId=${heroId}`,
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
