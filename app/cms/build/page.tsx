import React from "react";
import prisma from "@/lib/prismadb";
import ContainerBuildCMS from "./container";

async function getItems() {
  return await prisma.item.findMany();
}

async function getHeroes() {
  return await prisma.hero.findMany();
}

async function BuildCMSPage() {
  const items = await getItems();
  const heroes = await getHeroes();
  return (
    <>
      <ContainerBuildCMS items={items} heroes={heroes} />
    </>
  );
}

export default BuildCMSPage;
