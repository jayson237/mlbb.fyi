export const fetcher = async (data: string) => {
  const fields = {
    data: data[1],
  };

  return await fetch(data[0], {
    method: "POST",
    body: JSON.stringify(fields),
  }).then((res) => res.json());
};
