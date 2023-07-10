export default async function getHeroStats() {
  try {
    const types = [0, 1, 2];
    const urls = types.map(
      (type) => `${process.env.BE_API_URL}/hero-stats?type=${type}`
    );

    const requests = urls.map((url) =>
      fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.BE_API_SECRET}`,
        },
      })
    );

    const responses = await Promise.all(requests);
    const data = await Promise.all(responses.map((res) => res.json()));

    return data.map((res) => res.data.data);
  } catch (error) {
    return null;
  }
}
