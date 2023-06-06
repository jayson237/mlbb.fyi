import { PrismaClient } from "@prisma/client";
import * as fs from "fs/promises";

const prisma = new PrismaClient();

async function main() {
  const fileData = await fs.readFile("res.json", "utf-8"); // Read the JSON file
  const heroesData = JSON.parse(fileData);
  const heroes = heroesData.data.data;
  for (const x of heroes) {
    const hero = await prisma.hero.update({
      where: {
        name: x.name,
      },
      data: {
        role: x.role,
      },
    });
    console.log(hero.name);
  }
}

main()
  .catch(async (e) => {
    console.error(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
