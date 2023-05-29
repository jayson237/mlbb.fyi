import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import prisma from "@/lib/prismadb";

import ProfileContainer from "@/components/profile/profile-container";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { NextResponse } from "next/server";

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

async function getUsername(username: string) {
  return await prisma.user.findFirst({
    where: {
      username,
    },
  });
}

async function getDesc(username: string) {
  try {
    const user = await getUsername(username);
    return user?.desc || null;
  } catch (error) {
    return null;
  }
}

async function getDataAcc(accId: string | null) {
  try {
    const get = await fetch(`${process.env.BE_API_URL}/data?accId=${accId}`, {
      method: "GET",
    });
    const res = await get.json();

    return res;
  } catch (error) {
    return null;
  }
}

const ProfilePage = async ({ params }: { params: { username: string } }) => {
  const { username } = params;
  const existingUser = await getUsername(username);
  const userDesc = await getDesc(username);

  if (!existingUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="mb-48 text-2xl md:ml-3">Profile does not exist...</p>
      </div>
    );
  }

  const user = await getCurrentUser();
  if (!user?.username) {
    NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/stg`)
    );
  }

  let account = await acc(username);
  let dataAcc;
  if (!account) {
    account = null;
  } else {
    dataAcc = await getDataAcc(account.accId);
  }

  return (
    <>
      <ProfileContainer
        currentUser={user}
        viewMatchPlayed={dataAcc?.matchPlayed}
        viewOwnedHero={dataAcc?.heroOwned}
        userDesc={userDesc}
        isUser={username}
        isBoundUser={account}
      />
    </>
  );
};

export default ProfilePage;
