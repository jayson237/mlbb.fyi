import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";

import CodeForm from "@/components/profile/code-form";
import BoundedPrompt from "@/components/bounded-prompt";
import SignInPrompt from "@/components/signin-prompt";

export default async function AppBindVerify() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email);
  if (mlbbAcc) {
    return <BoundedPrompt />;
  } else if (!currentUser) {
    return <SignInPrompt />;
  }
  return (
    <div className="mt-24">
      <div className="text-center">
        <CodeForm currentUser={currentUser} />
      </div>
    </div>
  );
}
