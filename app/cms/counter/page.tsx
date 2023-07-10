import React from "react";
import prisma from "@/lib/prismadb";
import ContainerCounterCMS from "./container";

async function getHeroes() {
  return await prisma.hero.findMany();
}

async function CounterCMSPage() {
  const counters = await getHeroes();
  const heroes = await getHeroes();
  return (
    <>
      <ContainerCounterCMS counters={counters} heroes={heroes} />
    </>
  );
}

export default CounterCMSPage;
