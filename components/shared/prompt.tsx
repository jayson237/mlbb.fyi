"use client";

import { Button } from "./button";
import Link from "next/link";

interface IPrompt {
  message?: string;
  link?: string;
  button?: string;
}

const Prompt = ({ message, link, button }: IPrompt) => {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-full max-w-xl">
        <div className="mx-auto mb-40 text-center">
          <p className="pt-3 font-heading text-4xl">{message}</p>
          <Button className="mt-4 w-fit rounded-2xl" variant="gradiantNavySec">
            <Link href={link || "/"}>{button}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
