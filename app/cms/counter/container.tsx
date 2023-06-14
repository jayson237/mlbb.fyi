/* eslint-disable @next/next/no-img-element */
"use client";

import { Hero } from "@prisma/client";
import { useState } from "react";

interface IContainerCounterCMS {
  counters: Hero[];
  heroes: Hero[];
}

const ContainerCounterCMS = ({ counters, heroes }: IContainerCounterCMS) => {
  const [selectedHeroes, setSelectedHeroes] = useState("");
  const [selectedCounters, setSelectedCounters] = useState({
    choice1: "",
  });

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/counter/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              hero: selectedHeroes,
              choice1: selectedCounters.choice1,
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
            setSelectedCounters({
              ...selectedCounters,
              choice1: e.target.value,
            });
          }}
        >
          {counters.map((hero) => (
            <option value={hero.id} key={hero.id} className="">
              {hero.name}
            </option>
          ))}
        </select>

        <button className="text-white">Add</button>
      </form>
    </>
  );
};

export default ContainerCounterCMS;
