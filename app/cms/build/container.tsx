/* eslint-disable @next/next/no-img-element */
"use client";

import { fetcher } from "@/lib/utils";
import { Hero, Item } from "@prisma/client";
import { useState } from "react";
import useSWR from "swr";

interface IContainerBuildCMS {
  items: Item[];
  heroes: Hero[];
}

const ContainerBuildCMS = ({ items, heroes }: IContainerBuildCMS) => {
  const [selectedHeroes, setSelectedHeroes] = useState("");
  const [selectedItems, setSelectedItems] = useState({
    choice1: "",
    choice2: "",
    choice3: "",
    choice4: "",
    choice5: "",
    choice6: "",
  });

  const { data: fetchBuild } = useSWR<{
    message: string;
    data: {
      _id: string;
      heroId: string;
      items: Item[];
    }[];
  }>("/api/build", fetcher);
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await fetch("/api/build/create", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              hero: selectedHeroes,
              choice1: selectedItems.choice1,
              choice2: selectedItems.choice2,
              choice3: selectedItems.choice3,
              choice4: selectedItems.choice4,
              choice5: selectedItems.choice5,
              choice6: selectedItems.choice6,
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
            setSelectedItems({ ...selectedItems, choice1: e.target.value });
          }}
        >
          {items.map((item) => (
            <option value={item.id} key={item.id} className="">
              {item.name}
            </option>
          ))}
        </select>
        <select
          name="items2"
          id="items2"
          onChange={(e) => {
            setSelectedItems({ ...selectedItems, choice2: e.target.value });
          }}
        >
          {items.map((item) => (
            <option value={item.id} key={item.id} className="">
              {item.name}
            </option>
          ))}
        </select>
        <select
          name="items3"
          id="items3"
          onChange={(e) => {
            setSelectedItems({ ...selectedItems, choice3: e.target.value });
          }}
        >
          {items.map((item) => (
            <option value={item.id} key={item.id} className="">
              {item.name}
            </option>
          ))}
        </select>
        <select
          name="items4"
          id="items4"
          onChange={(e) => {
            setSelectedItems({ ...selectedItems, choice4: e.target.value });
          }}
        >
          {items.map((item) => (
            <option value={item.id} key={item.id} className="">
              {item.name}
            </option>
          ))}
        </select>
        <select
          name="items5"
          id="items5"
          onChange={(e) => {
            setSelectedItems({ ...selectedItems, choice5: e.target.value });
          }}
        >
          {items.map((item) => (
            <option value={item.id} key={item.id} className="">
              {item.name}
            </option>
          ))}
        </select>
        <select
          name="items6"
          id="items6"
          onChange={(e) => {
            setSelectedItems({ ...selectedItems, choice6: e.target.value });
          }}
        >
          {items.map((item) => (
            <option value={item.id} key={item.id} className="">
              {item.name}
            </option>
          ))}
        </select>

        <button className="text-white">Submit</button>
      </form>

      <ul className="flex flex-col gap-4">
        {fetchBuild?.data?.map((build) => {
          // @ts-nocheck
          return (
            <li key={build._id}>
              <p>{build.heroId}</p>
              <ul className="flex gap-4">
                {build.items.map((item) => (
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

export default ContainerBuildCMS;
