import { PrismaClient } from "@prisma/client";
import * as fs from "fs/promises";
const prisma = new PrismaClient();

async function main() {
  const fileData = await fs.readFile("tier-list.json", "utf-8");
  const itemsData = JSON.parse(fileData);

  for (const hero of itemsData) {
    const updatedHero = await prisma.hero.update({
      where: {
        name: hero.name,
      },
      data: {
        tier: hero.tier,
      },
    });

    console.log(updatedHero.name);
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
