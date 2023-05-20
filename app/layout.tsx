import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";

import ToasterProvider from "@/components/providers/toaster-provider";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { NextRequest, NextResponse } from "next/server";
import Navbar from "@/components/shared/navbar/navbar";

export const metadata = {
  title: "mlbb.fyi",
  description: "MLBB Forum hehehehe",
};

const inter = Inter({ subsets: ["latin"] });

const fontHeading = localFont({
  src: "../assets/fonts/cal-sans/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export default async function RootLayout({
  children,
  req,
  res,
}: {
  children: React.ReactNode;
  req: NextRequest;
  res: NextResponse;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${inter.className} ${fontHeading.variable} text-softGray`}
    >
      <body>
        <div className="relative mx-auto min-h-screen overflow-hidden bg-bgblack text-pwhite blur-none after:absolute after:inset-x-0 after:top-[-1350px] after:z-[-1] after:mx-auto after:h-[1440px] after:w-[1880px] after:rounded-full after:bg-navy-600 after:blur-[150px]">
          <div className="mt-24 max-w-[1280px] px-4 xl:mx-auto">
            <Navbar currentUser={currentUser} />
            <ToasterProvider />
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
