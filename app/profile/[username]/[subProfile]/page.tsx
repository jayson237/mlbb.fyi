import getCurrentUser from "@/lib/actions/getCurrentUser";
import getUser from "@/lib/actions/getUser";
import getMlbbData from "@/lib/actions/getMlbbData";
import isUserBound from "@/lib/actions/isUserBound";

import { TabsContent } from "@/components/shared/tabs";
import Statistics from "@/components/profile/statistics";
import PostList from "@/components/profile/profile-bio/post-list";
import Redirect from "@/components/redirect";

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

  if (
    params.subProfile !== "statistics" &&
    params.subProfile !== "posts" &&
    params.subProfile !== "starred"
  ) {
    return <Redirect destination="not-found" />;
  }

  return (
    <TabsContent
      value={params.subProfile}
      className="flex w-full flex-col gap-4 md:flex-row"
    >
      {params.subProfile === "statistics" && (
        <div className="flex w-full flex-col gap-4">
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
        <div className="grow">
          <PostList />
        </div>
      )}
    </TabsContent>
  );
}

export default SubProfilePage;
