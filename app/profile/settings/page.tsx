import SettingsForm from "@/components/profile/settings-form";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";

async function SettingsPage() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email || "");
  // if (!mlbbAcc) mlbbAcc = null;

  return (
    <main>
      <SettingsForm currentUser={currentUser} mlbbAcc={mlbbAcc} />
    </main>
  );
}

export default SettingsPage;
