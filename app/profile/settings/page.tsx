import SettingsForm from "@/components/profile/settings-form";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";

async function SettingsPage() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email || "");
  // if (!mlbbAcc) mlbbAcc = null;

  return (
    <main>
      <h1 className="text-center font-heading text-3xl font-bold">
        Profile Settings
      </h1>
      <SettingsForm currentUser={currentUser} mlbbAcc={mlbbAcc} />
    </main>
  );
}

export default SettingsPage;
