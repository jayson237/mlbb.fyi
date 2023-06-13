/* eslint-disable @next/next/no-img-element */
"use client";

import { fetcher } from "@/lib/utils";
import { Hero, Spell } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";

interface IConatainerSpellCMS {
  spells: Spell[];
  heroes: Hero[];
}

const ContainerSpellCMS = ({ spells, heroes }: IConatainerSpellCMS) => {
  const [selectedHeroes, setSelectedHeroes] = useState("");
  const [selectedSpells, setSelectedSpells] = useState({
    choice1: "",
    choice2: "",
  });

  const { data: fetchSpell } = useSWR<{
    message: string;
    data: {
      _id: string;
      heroId: string;
      spells: Spell[];
    }[];
  }>("/api/spell", fetcher);
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/spell/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              hero: selectedHeroes || null,
              choice1: selectedSpells.choice1,
              choice2: selectedSpells.choice2,
            }),
          });
        }}
        className="mx-auto flex max-w-xs flex-col gap-3 text-black"
      >
        <select
          name="heroes"
          id="heroes"
          onChange={(e) => {
            setSelectedHeroes(e.target.value);
          }}
        >
          {heroes.map((hero) => (
            <option value={hero.id} key={hero.id} className="">
              {hero.name}
            </option>
          ))}
        </select>

        <select
          name="items1"
          id="items1"
          onChange={(e) => {
            setSelectedSpells({ ...selectedSpells, choice1: e.target.value });
          }}
        >
          {spells.map((spell) => (
            <option value={spell.id} key={spell.id} className="">
              {spell.name}
            </option>
          ))}
        </select>
        <select
          name="items2"
          id="items2"
          onChange={(e) => {
            setSelectedSpells({ ...selectedSpells, choice2: e.target.value });
          }}
        >
          {spells.map((spell) => (
            <option value={spell.id} key={spell.id} className="">
              {spell.name}
            </option>
          ))}
        </select>

        <button className="text-white">Haha</button>
      </form>

      <ul className="flex flex-col gap-4">
        {fetchSpell?.data?.map((spell) => {
          // @ts-nocheck
          return (
            <li key={spell._id}>
              <p>{spell.heroId}</p>
              <ul className="flex gap-4">
                {spell.spells.map((item) => (
                  <li key={item.id}>
                    <img src={item.img} alt={item.id} width={40} height={40} />
                    <p>{item.name}</p>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ContainerSpellCMS;
