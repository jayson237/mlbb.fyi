import Settings from "@/components/profile/settings";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import { Suspense } from "react";

async function SettingsPage() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email || "");

  return (
    <main>
      <Suspense>
        <Settings currentUser={currentUser} mlbbAcc={mlbbAcc} />
      </Suspense>
    </main>
  );
}

export default SettingsPage;
