import React from "react";
import prisma from "@/lib/prismadb";
import ContainerEmblemCMS from "./container";

async function getEmblems() {
  return await prisma.emblem.findMany();
}

async function getHeroes() {
  return await prisma.hero.findMany();
}

async function EmblemCMSPage() {
  const emblems = await getEmblems();
  const heroes = await getHeroes();
  return (
    <>
      <ContainerEmblemCMS emblems={emblems} heroes={heroes} />
    </>
  );
}

export default EmblemCMSPage;
