import getCurrentUser from "@/lib/actions/getCurrentUser";
import getUser from "@/lib/actions/getUser";
import getMlbbData from "@/lib/actions/getMlbbData";
import isUserBound from "@/lib/actions/isUserBound";

import { notFound } from "next/navigation";
import { TabsContent } from "@/components/shared/tabs";

import Statistics from "@/components/profile/statistics";
import ProfileList from "@/components/profile/profile-list";
import { Link2 } from "lucide-react";

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
    params.subProfile !== "statistics" &&
    params.subProfile !== "posts" &&
    params.subProfile !== "favourites"
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
          {isBoundProfile ? (
            <Statistics
              viewMatchPlayed={dataAcc?.matchPlayed}
              viewOwnedHero={dataAcc?.heroOwned}
              isBound={isBoundProfile ? true : false}
            />
          ) : (
            <div className="mt-4 flex h-screen flex-col items-center justify-center">
              <Link2 className="h-20 w-20" />
              <p className="text-md mb-[560px] px-20 text-center font-heading md:mb-96 md:ml-3 md:text-2xl">
                Mobile Legends account hasn&apos;t been bound yet
              </p>
            </div>
          )}
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

      {params.subProfile === "favourites" && (
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
