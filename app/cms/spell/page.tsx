import React from "react";
import prisma from "@/lib/prismadb";
import ContainerSpellCMS from "./container";

async function getSpells() {
  return await prisma.spell.findMany();
}

async function getHeroes() {
  return await prisma.hero.findMany();
}

async function BuildCMSPage() {
  const spells = await getSpells();
  const heroes = await getHeroes();
  return (
    <>
      <ContainerSpellCMS spells={spells} heroes={heroes} />
    </>
  );
}

export default BuildCMSPage;
