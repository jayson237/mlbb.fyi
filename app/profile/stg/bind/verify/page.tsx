import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import CodeForm from "@/components/profile/code-form";
import Redirect from "@/components/Redirect";

export default async function AppBindVerify() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email);
  if (mlbbAcc)
    return <Redirect redirectTo="profile" currentUser={currentUser} />;
  else if (!currentUser) {
    return <Redirect redirectTo="explore" />;
  }
  return (
    <div className="mt-24">
      <div className="text-center">
        <CodeForm currentUser={currentUser} />
      </div>
    </div>
  );
}
