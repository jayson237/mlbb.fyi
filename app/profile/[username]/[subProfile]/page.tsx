import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import getCurrentUser from "@/lib/actions/getCurrentUser";

import prisma from "@/lib/prismadb";
import { TabsContent } from "@radix-ui/react-tabs";
import Statistics from "@/components/profile/statistics";

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

async function getDataAcc(accId: string | null) {
  try {
    const get = await fetch(`${process.env.BE_API_URL}/data?accId=${accId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BE_API_SECRET}`,
      },
    });
    const res = await get.json();

    return res;
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

async function SubProfilePage({
  params,
}: {
  params: { username: string; subProfile: string };
}) {
  const currentUser = await getCurrentUser();
  const profileUsername = params.username;
  const isExistingUser = await getUser(profileUsername);

  if (!isExistingUser) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="mb-48 text-2xl md:ml-3">Profile does not exist...</p>
      </div>
    );
  }

  let isBoundProfile = await acc(profileUsername);
  let dataAcc;
  if (!isBoundProfile) {
    isBoundProfile = null;
  } else {
    dataAcc = await getDataAcc(isBoundProfile.accId);
  }
  const isOwnProfile = currentUser?.username === isExistingUser?.username;

  return (
    <TabsContent
      value={params.subProfile}
      className="flex w-full flex-col gap-4 md:flex-row"
    >
      {params.subProfile === "statistics" ? (
        <div className="flex w-full flex-col gap-4">
          {!isOwnProfile && (
            <p className="pl-2 text-sm">
              This user&apos;s Mobile Legends account hasn&apos;t been bound yet
            </p>
          )}
          <Statistics
            viewMatchPlayed={dataAcc?.matchPlayed}
            viewOwnedHero={dataAcc?.heroOwned}
            isBound={isBoundProfile ? true : false}
          />
        </div>
      ) : (
        <></>
      )}
    </TabsContent>
  );
}

export default SubProfilePage;
