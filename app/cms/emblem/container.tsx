/* eslint-disable @next/next/no-img-element */
"use client";

import { fetcher } from "@/lib/utils";
import { Hero, Emblem } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";

interface IContainerEmblemCMS {
  emblems: Emblem[];
  heroes: Hero[];
}

const ContainerEmblemCMS = ({ emblems, heroes }: IContainerEmblemCMS) => {
  const [selectedHeroes, setSelectedHeroes] = useState("");
  const [selectedEmblems, setSelectedEmblems] = useState({
    choice1: "",
    choice2: "",
  });

  const { data: fetchEmblem } = useSWR<{
    message: string;
    data: {
      _id: string;
      heroId: string;
      emblems: Emblem[];
    }[];
  }>("/api/emblem", fetcher);
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/emblem/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              hero: selectedHeroes || null,
              choice1: selectedEmblems.choice1,
              choice2: selectedEmblems.choice2,
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
            setSelectedEmblems({ ...selectedEmblems, choice1: e.target.value });
          }}
        >
          {emblems.map((emblem) => (
            <option value={emblem.id} key={emblem.id} className="">
              {emblem.name}
            </option>
          ))}
        </select>
        <select
          name="items2"
          id="items2"
          onChange={(e) => {
            setSelectedEmblems({ ...selectedEmblems, choice2: e.target.value });
          }}
        >
          {emblems.map((emblem) => (
            <option value={emblem.id} key={emblem.id} className="">
              {emblem.name}
            </option>
          ))}
        </select>

        <button className="text-white">Submit</button>
      </form>

      <ul className="flex flex-col gap-4">
        {fetchEmblem?.data?.map((emblem) => {
          // @ts-nocheck
          return (
            <li key={emblem._id}>
              <p>{emblem.heroId}</p>
              <ul className="flex gap-4">
                {emblem.emblems.map((item) => (
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

export default ContainerEmblemCMS;
