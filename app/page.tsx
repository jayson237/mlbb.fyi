import { Button } from "@/components/shared/button";
import Link from "next/link";

export const metadata = {
  title: "mlbb.fyi - Elevate Your Mobile Legends Game",
  description:
    "Access hero stats, optimal builds, and connect with a community of expert players.",
  openGraph: {
    title: "mlbb.fyi - Elevate Your Mobile Legends Game",
    description:
      "Access hero stats, optimal builds, and connect with a community of expert players.",
    url: "https://mlbb.fyi",
    siteName: "Next.js",
    images: [
      {
        url: "/og.jpg",
        width: 1260,
        height: 600,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mlbb.fyi - Elevate Your Mobile Legends Game",
    description:
      "Access hero stats, optimal builds, and connect with a community of expert players.",
    images: ["/og.jpg"],
  },
};

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
            variant="gradiantNavySec"
          >
            <Link href="/explore">Get Started</Link>
          </Button>

          <div className="flex flex-col items-center justify-center pt-[200px]">
            <div className="flex items-end justify-center">
              <h1 className="text-center text-[12px] text-neutral-500">
                mlbb.fyi was made as part of 2023 Orbital project, and is not
                endorsed by Moonton or Mobile Legends: Bang Bang. mlbb.fyi does
                not reflect the views or opinions of Moonton or anyone
                officially involved in producing or managing Mobile Legends.
              </h1>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
