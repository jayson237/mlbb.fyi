import { Button } from "@/components/shared/button";
import { Checkbox } from "@/components/shared/checkbox";
import { Label } from "@/components/shared/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/shared/tabs";
import { heros } from "@prisma/client";
import Image from "next/image";
import React from "react";
import prisma from "@/lib/prismadb";

async function getHero() {
  return await prisma.heros.findMany({});
}

async function WikiPage() {
  const heros: heros[] = await getHero();

  return (
    <main>
      <h1 className="ml-0 max-w-4xl font-heading text-4xl leading-10 md:ml-3">
        Welcome to mlbb.fyi wiki, your latest and greatest Mobile Legends
        Information in one place
      </h1>

      <Tabs defaultValue="heroes" className="mt-4 w-full">
        <TabsList>
          <TabsTrigger value="heroes">Heroes</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
          <TabsTrigger value="draft-pick">Draft Pick</TabsTrigger>
          <TabsTrigger value="patch">Patch</TabsTrigger>
          <TabsTrigger value="meta">META</TabsTrigger>
        </TabsList>
        <TabsContent
          value="heroes"
          className="flex w-full flex-col gap-5 md:flex-row"
        ></TabsContent>
        <TabsContent value="statistics" className=""></TabsContent>
        <TabsContent value="draft-pick" className=""></TabsContent>
      </Tabs>
    </main>
  );
}

export default WikiPage;
