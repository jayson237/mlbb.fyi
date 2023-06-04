import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";

import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/tabs";
import { Button } from "@/components/shared/button";
import ProfileBio from "@/components/profile/bio";

export const metadata = {
  title: "Profile - mlbb.fyi",
  description: "Your mlbb.fyi profile",
};

async function acc(username: string) {
  try {
    const get = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    const mlbbAcc = await getMlbbAcc(get?.email || "");
    return mlbbAcc;
  } catch (error) {
    return null;
  }
}

async function getUser(username: string) {
  return await prisma.user.findFirst({
    where: {
      username,
    },
  });
}

const ProfileTabList = [
  {
    name: "Statistics",
    href: "/statistics",
  },
  {
    name: "Posts",
    href: "/posts",
  },
  {
    name: "Starred",
    href: "/starred",
  },
];

export interface LayoutProfileProps {
  params: { username: string };
  children: React.ReactNode;
}

export default async function LayoutProfile({
  params,
  children,
}: LayoutProfileProps) {
  const currentUser = await getCurrentUser();
  if (!currentUser?.username) {
    NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/stg`)
    );
  }

  const profileUsername = params.username;
  const isExistingUser = await getUser(profileUsername);

  let isBoundProfile = await acc(profileUsername);
  if (!isBoundProfile) {
    isBoundProfile = null;
  }

  const isOwnProfile = currentUser?.username === isExistingUser?.username;

  return (
    <main className="max-w-[1280px] xl:mx-auto">
      <div className="flex flex-1 flex-col gap-5 md:flex-row">
        <div className="mx-auto flex gap-5 text-softGray">
          <ProfileBio
            currentUser={currentUser}
            user={isExistingUser}
            mlbbAcc={isBoundProfile}
            isOwnProfile={isOwnProfile}
          />
        </div>
        <Tabs defaultValue="statistics" className="w-full">
          <div className="no-scrollbar h-[52px] overflow-x-scroll">
            <TabsList>
              {ProfileTabList.map((item, i) => {
                if (!isOwnProfile && item.name === "Starred") {
                  return null;
                }

                return (
                  <Link
                    href={`/profile/${isExistingUser?.username + item.href}`}
                    key={i}
                    scroll={false}
                  >
                    <TabsTrigger value={item.name}>{item.name}</TabsTrigger>
                  </Link>
                );
              })}
            </TabsList>
            {/* {!isBoundProfile && isOwnProfile && (
              <Button
                className="h-8 rounded-full px-[10px] py-2"
                variant="gradiantNavySec"
              >
                <Link href="/profile/stg/bind" className="text-[12px]">
                  Bind account
                </Link>
              </Button>
            )} */}
          </div>
          {children}
        </Tabs>
      </div>
    </main>
  );
}
