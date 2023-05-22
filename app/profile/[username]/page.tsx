import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import getWinRate from "@/lib/actions/getWinRate";
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
    const mlbbAcc = await getMlbbAcc(get?.email);
    return mlbbAcc?.accId;
  } catch (error) {
    return null;
  }
}

async function getDataAcc(accId: string) {
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

  const user = await getCurrentUser();
  if (!user?.username) {
    NextResponse.redirect(
      new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/profile/settings`)
    );
  }

  let accId = await acc(username);
  let dataAcc;
  if (!accId) {
    accId = null;
  } else {

    dataAcc = await getDataAcc(accId);
  }


  return (
    <div className="overflow-hidden">
      <ProfileContainer
        matchPlayed={dataAcc?.matchPlayed}
        ownedHero={dataAcc?.heroOwned}
        username={username}
        accId={accId}
        // winRate={winRate}
      />
    </div>
  );
};

export default ProfilePage;
