import getCurrentUser from "@/lib/actions/getCurrentUser";
import getUser from "@/lib/actions/getUser";
import isUserBound from "@/lib/actions/isUserBound";
import { NextResponse } from "next/server";
import ProfileBio from "@/components/profile/bio";
import ProfileTab from "@/components/profile/profile-tab";

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
    name: "Favourites",
    href: "/favourites",
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
  const { username } = params;

  const currentUser = await getCurrentUser();

  if (currentUser && !currentUser.username) {
    return NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/stg`)
    );
  }

  const isExistingUser = await getUser(username);

  let isBoundProfile = await isUserBound(username);
  if (!isBoundProfile) {
    isBoundProfile = null;
  }

  const isOwnProfile = currentUser?.username === isExistingUser?.username;
  if (!isExistingUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="mb-48 font-heading text-2xl md:ml-3">
          Profile does not exist...
        </p>
      </div>
    );
  }

  return (
    <main className="max-w-[1280px] xl:mx-auto">
      <div className="flex flex-1 flex-col gap-1.5 md:flex-row">
        <div className="mx-auto flex gap-1.5 text-softGray">
          <ProfileBio
            currentUser={currentUser}
            user={isExistingUser}
            mlbbAcc={isBoundProfile}
            isOwnProfile={isOwnProfile}
          />
        </div>
        <ProfileTab
          ProfileTabList={ProfileTabList}
          isExistingUser={isExistingUser}
        >
          {children}
        </ProfileTab>
      </div>
    </main>
  );
}
