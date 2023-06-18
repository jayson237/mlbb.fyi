"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/shared/button";

const NotFoundPage = () => {
  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="font-heading text-4xl">Ooops...</h1>
      <h2 className="mb-4 font-semibold">This page cannot be found</h2>
      <Button className=" w-52 rounded-lg" variant="gradiantNavySec">
        <Link href="/">Back to homepage</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
