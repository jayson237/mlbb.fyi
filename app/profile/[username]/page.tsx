import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import getWinRate from "@/lib/actions/getWinRate";
import prisma from "@/lib/prismadb";

import MainApp from "@/components/profile/profile-container";

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

  const accId = await acc(username);
  if (!accId) return null;

  const dataAcc = await getDataAcc(accId);

  return (
    <div className="overflow-hidden">
      <MainApp
        matchPlayed={dataAcc?.matchPlayed}
        ownedHero={dataAcc?.heroOwned}
        username={username}
        // winRate={winRate}
      />
    </div>
  );
};

export default ProfilePage;
