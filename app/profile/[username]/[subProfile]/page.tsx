import getCurrentUser from "@/lib/actions/getCurrentUser";
import getUser from "@/lib/actions/getUser";
import getMlbbData from "@/lib/actions/getMlbbData";
import isUserBound from "@/lib/actions/isUserBound";

import { notFound } from "next/navigation";
import { TabsContent } from "@/components/shared/tabs";

import Statistics from "@/components/profile/statistics";
import ProfileList from "@/components/profile/profile-list";

async function SubProfilePage({
  params,
}: {
  params: { username: string; subProfile: string };
}) {
  const currentUser = await getCurrentUser();
  const profileUsername = params.username;
  const isExistingUser = await getUser(profileUsername);

  let isBoundProfile = await isUserBound(profileUsername);
  let dataAcc;
  if (!isBoundProfile) {
    isBoundProfile = null;
  } else {
    dataAcc = await getMlbbData(isBoundProfile.accId);
  }
  const isOwnProfile = currentUser?.username === isExistingUser?.username;
  const hasPosts = isExistingUser?.posts.length !== 0;
  const hasFavs = isExistingUser?.favourite.length !== 0;

  if (
    (params.subProfile !== "statistics" &&
      params.subProfile !== "posts" &&
      params.subProfile !== "starred") ||
    (params.subProfile === "starred" && !isOwnProfile)
  ) {
    notFound();
  }

  return (
    <TabsContent
      value={params.subProfile}
      className="flex w-full flex-col gap-1.5 md:flex-row"
    >
      {params.subProfile === "statistics" && (
        <div className="flex w-full flex-col gap-1.5">
          {!isOwnProfile && !isBoundProfile && (
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
      )}

      {params.subProfile === "posts" && (
        <div className="no-scrollbar max-h-[90vh] w-full grow overflow-scroll">
          <ProfileList
            username={params.username}
            type="post"
            isOwnProfile={isOwnProfile}
            hasPosts={hasPosts}
          />
        </div>
      )}

      {params.subProfile === "starred" && (
        <div className="no-scrollbar max-h-[90vh] w-full grow overflow-scroll">
          <ProfileList
            username={params.username}
            type="favourite"
            isOwnProfile={isOwnProfile}
            hasPosts={hasFavs}
          />
        </div>
      )}
    </TabsContent>
  );
}

export default SubProfilePage;
