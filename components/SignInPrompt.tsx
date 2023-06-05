"use client";

import { Button } from "./shared/button";
import Link from "next/link";

const SignInPrompt = () => {
  return (
    <div className="mt-48">
      <div className="mx-auto flex max-w-xl flex-col justify-center text-center">
        <p className="pt-3 text-[16px] md:text-2xl">Please sign in first</p>
        <Button
          className="mx-auto mt-4 w-fit rounded-full"
          variant="gradiantNavySec"
        >
          <Link href="/auth/signin">Sign in here</Link>
        </Button>
      </div>
    </div>
  );
};

export default SignInPrompt;
