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
        <div className="relative mx-auto min-h-screen overflow-hidden bg-bgblack text-pwhite">
          <div className="mt-24 max-w-[1440px] xl:mx-auto">
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

{
  /* <div className="absolute inset-0 -top-[400px] -z-10 max-h-[863px] max-w-7xl rounded-full bg-Purple-500/40 blur-[287.5px] "></div>

          <div className="absolute inset-0 left-[calc(50%-898px/2-720px)] top-[800px] -z-10 max-h-[863px] max-w-[898px] rounded-full bg-Cyan-500/40 blur-[287.5px] "></div>

          <div className="absolute inset-0 right-[calc(50%-898px/2-720px)] top-[1400px] -z-10 max-h-[863px] max-w-[898px] rounded-full bg-red-500/40 blur-[287.5px] "></div> */
}
