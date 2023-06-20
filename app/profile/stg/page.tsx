import Settings from "@/components/profile/settings";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";

async function SettingsPage() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email || "");
  // if (!mlbbAcc) mlbbAcc = null;
  // console.log(currentUser?.username);

  return (
    <main>
      <Settings currentUser={currentUser} mlbbAcc={mlbbAcc} />
    </main>
  );
}

export default SettingsPage;
