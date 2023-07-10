import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";

import CodeForm from "@/components/profile/bind-account/code-form";
import Prompt from "@/components/shared/prompt";

export default async function AppBindVerify() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email);
  if (mlbbAcc) {
    return (
      <Prompt
        message="You have previously bound your Mobile Legends account"
        link="/profile/stg"
        button="Back to settings"
      />
    );
  } else if (!currentUser) {
    return (
      <Prompt
        message="Please sign in first"
        link="/auth/signin"
        button="Go to sign-in page"
      />
    );
  }
  return (
    <div className="mt-24">
      <div className="text-center">
        <CodeForm currentUser={currentUser} />
      </div>
    </div>
  );
}
