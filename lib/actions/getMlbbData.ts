export default async function getMlbbData(accId: string | null) {
  try {
    const get = await fetch(
      `${process.env.BE_API_URL}/data?accId=${accId}&cmp=5`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.BE_API_SECRET}`,
        },
      }
    );
    const res = await get.json();

    return res;
  } catch (error) {
    return null;
  }
}
