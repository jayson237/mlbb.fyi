export default async function getHeroStats() {
  try {
    const get = await fetch(`${process.env.BE_API_URL}/hero-stats?type=0`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BE_API_SECRET}`,
      },
    });
    const res = await get.json();
    return res.data.data;
  } catch (error) {
    return null;
  }
}
