import getCurrentUser from "@/lib/actions/getCurrentUser";
import { NextResponse } from "next/server";

export const metadata = {
  title: "Profile - mlbb.fyi",
  description: "Your mlbb.fyi profile ",
};

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <main className="max-w-[1280px] overflow-hidden xl:mx-auto">
      {children}
    </main>
  );
}
