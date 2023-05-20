import { Button } from "@/components/shared/button";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="mt-36">
        <div className="mx-auto flex max-w-xl flex-col justify-center text-center">
          <h1 className="font-heading text-[44px] font-bold leading-10 md:text-[64px] md:leading-[60px]">
            Elevate Your Mobile <br className="hidden md:block" /> Legends Game
          </h1>
          <p className="pt-3 text-[14px] leading-tight text-gray-100 md:text-[18px]">
            Access hero stats, optimal builds, and connect{" "}
            <br className="hidden md:block" /> with a community of expert
            players.
          </p>

          <Button
            className="mx-auto mt-4 w-fit rounded-full"
            variant="gradiantNavy"
          >
            <Link href="/auth/signin">Get Started</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
