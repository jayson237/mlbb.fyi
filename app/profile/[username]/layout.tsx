import getCurrentUser from "@/lib/actions/getCurrentUser";
import getUser from "@/lib/actions/getUser";
import isUserBound from "@/lib/actions/isUserBound";

import { NextResponse } from "next/server";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/tabs";
import ProfileBio from "@/components/profile/bio";

export const metadata = {
  title: "Profile - mlbb.fyi",
  description: "Your mlbb.fyi profile",
};

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

  let isBoundProfile = await isUserBound(profileUsername);
  if (!isBoundProfile) {
    isBoundProfile = null;
  }

  const isOwnProfile = currentUser?.username === isExistingUser?.username;
  if (!isExistingUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="mb-48 text-2xl md:ml-3">Profile does not exist...</p>
      </div>
    );
  }

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
              {ProfileTabList.map((item, i) =>
                !isOwnProfile && item.name === "Starred" ? null : (
                  <Link
                    href={`/profile/${isExistingUser?.username + item.href}`}
                    key={i}
                    scroll={false}
                  >
                    <TabsTrigger value={item.name.toLowerCase()}>
                      {item.name}
                    </TabsTrigger>
                  </Link>
                )
              )}
            </TabsList>
          </div>
          {children}
        </Tabs>
      </div>
    </main>
  );
}
