import prisma from "@/lib/prismadb";

export default async function getTournamentStats() {
  try {
    const patches = await prisma.tourneyStats.findMany();
    return patches;
  } catch (error) {
    throw new Error("Failed to fetch stats");
  }
}
