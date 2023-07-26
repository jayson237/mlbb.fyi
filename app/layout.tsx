import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";

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
      <Script
        id="cla"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q[]||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "i5eisaebyw");
          `,
        }}
      />
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-RYMVSHE2KQ"
        strategy="afterInteractive"
      ></Script>
      <Script id="google-analytics" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-RYMVSHE2KQ');`}
      </Script>
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
      </body>
    </html>
  );
}
// after:fixed after:inset-x-0 after:top-[-1350px] after:z-[-1] after:mx-auto after:h-[1440px] after:w-[1880px] after:rounded-full after:bg-navy-600 after:blur-[150px]
