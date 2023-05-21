import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";
import { NextRequest, NextResponse } from "next/server";

import getCurrentUser from "@/lib/actions/getCurrentUser";
import ToasterProvider from "@/components/providers/toaster-provider";
import Navbar from "@/components/shared/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

const fontHeading = localFont({
  src: "../assets/fonts/cal-sans/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html
      lang="en"
      className={`${inter.className} ${fontHeading.variable} text-softGray`}
    >
      <body>
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <div className="relative mx-auto min-h-screen overflow-hidden bg-bgblack text-pwhite blur-none after:absolute after:inset-x-0 after:top-[-1350px] after:z-[-1] after:mx-auto after:h-[1440px] after:w-[1880px] after:rounded-full after:bg-navy-600 after:blur-[150px]">
          <div className="relative mx-auto mt-24 max-w-[1280px] px-4">
            {children}
          </div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
