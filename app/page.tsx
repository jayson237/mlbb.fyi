import { Button } from "@/components/shared/button";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <main className="mt-36">
        <div className="text-center">
          <h1 className="font-heading text-[44px] font-bold leading-10 md:text-[64px] md:leading-[60px]">
            Elevate Your Mobile <br className="hidden md:block" /> Legends Game
          </h1>
          <p className="pt-3 text-[14px] leading-tight md:text-[20px]">
            Access hero stats, optimal builds, and connect{" "}
            <br className="hidden md:block" /> with a community of expert
            players.
          </p>
          <Link href="/auth/signin">
            <Button className="mt-8">Get Started</Button>
          </Link>
        </div>
      </main>
    </>
  );
}
