import React from "react";

import prisma from "@/lib/prismadb";
import { Hero } from "@prisma/client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import HeroesContainer from "@/components/wiki/heroes/heroes-container";

async function getHero() {
  try {
    return await prisma.hero.findMany({});
  } catch {
    return null;
  }
}

async function WikiPage() {
  const heros: Hero[] | null = await getHero();

  return (
    <main>
      <h1 className="ml-0 max-w-4xl font-heading text-4xl leading-10 md:ml-3">
        mlbb.fyi wiki, your latest and greatest Mobile Legends information in
        one place
      </h1>

      <Tabs defaultValue="heroes" className="mt-4 w-full">
        <div className="no-scrollbar h-[52px] overflow-x-scroll">
          <TabsList className="flex shrink-0 space-x-4">
            <TabsTrigger value="heroes">Heroes</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
            <TabsTrigger value="draft-pick">Draft Pick</TabsTrigger>
            <TabsTrigger value="patch">Patch</TabsTrigger>
            <TabsTrigger value="meta">META</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="heroes"
          className="flex w-full flex-col gap-5 md:flex-row"
        >
          {/* <HeroesContainer heros={heros} /> */}
        </TabsContent>
        <TabsContent value="statistics" className=""></TabsContent>
        <TabsContent value="draft-pick" className=""></TabsContent>
      </Tabs>

      <p className="md:ml-3">
        We are currently in the process of implementing the wiki section, and we
        appreciate your understanding and patience. Thank you.
      </p>
    </main>
  );
}

export default WikiPage;
