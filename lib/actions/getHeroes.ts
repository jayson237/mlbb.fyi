import prisma from "@/lib/prismadb";

export default async function getHeroes() {
  try {
    const heroes = await prisma.heroDetails.findMany();
    return heroes;
  } catch (error) {
    throw new Error("Failed to fetch heroes");
  }
}
