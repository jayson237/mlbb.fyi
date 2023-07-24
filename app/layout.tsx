import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/react";

import getCurrentUser from "@/lib/actions/getCurrentUser";
import ToasterProvider from "@/components/providers/toaster-provider";
import Navbar from "@/components/shared/navbar/navbar";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

// export const metadata: Metadata = {
//   icons: {
//     icon: `${process.env.NEXTAUTH_URL}/icon.png}`,
//   },
// };

const inter = Inter({ subsets: ["latin"] });

const fontHeading = localFont({
  src: "../public/assets/fonts/CalSans-SemiBold.woff2",
  variable: "--font-heading",
});
const fontSatoshi = localFont({
  src: "../public/assets/fonts/Satoshi-Variable.ttf",
  variable: "--font-satoshi",
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
      className={`${inter.className} ${fontHeading.variable} ${fontSatoshi.variable} text-softGray`}
    >
      <body
        className={cn(
          "relative mx-auto mb-8 bg-bgblack pt-24 text-pwhite selection:bg-navy-400 selection:text-white",
          "after:fixed after:inset-x-0 after:top-[-1450px] after:z-[-1] after:mx-auto after:h-[1280px] after:w-[1880px] after:rounded-full after:bg-navy-500 after:blur-[400px]"
        )}
      >
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <div className="">
          <div className="relative mx-auto max-w-[1080px] px-4">{children}</div>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
// after:fixed after:inset-x-0 after:top-[-1350px] after:z-[-1] after:mx-auto after:h-[1440px] after:w-[1880px] after:rounded-full after:bg-navy-600 after:blur-[150px]
