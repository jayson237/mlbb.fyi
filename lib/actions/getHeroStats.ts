export default async function getHeroStats() {
  try {
    const types = [0, 1, 2];
    const data = [];

    for (const type of types) {
      const url = `${process.env.BE_API_URL}/hero-stats?type=${type}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.BE_API_SECRET}`,
        },
        cache: "no-store",
      });
      const responseData = await response.json();
      data.push(responseData.data.data);
    }
    return data;
  } catch (error) {
    return null;
  }
}
