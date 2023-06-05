"use client";

import { Button } from "./shared/button";
import Link from "next/link";

const BoundedPrompt = () => {
  return (
    <div className="mt-48">
      <div className="mx-auto flex max-w-xl flex-col justify-center text-center">
        <p className="pt-3 text-[16px] md:text-2xl">
          You have previously bound your Mobile Legends account
        </p>
        <Button
          className="mx-auto mt-4 w-fit rounded-full"
          variant="gradiantNavySec"
        >
          <Link href="/profile/stg">Back to settings</Link>
        </Button>
      </div>
    </div>
  );
};

export default BoundedPrompt;
