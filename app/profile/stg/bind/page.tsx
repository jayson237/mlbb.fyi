import getCurrentUser from "@/lib/actions/getCurrentUser";
import SyncForm from "@/components/profile/bind-form";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import SignInPrompt from "@/components/signin-prompt";
import BoundedPrompt from "@/components/bounded-prompt";

export default async function AppBind() {
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
        <h1 className="text-[44px] font-bold leading-10 tracking-tight md:text-[64px] md:leading-[60px]">
          Bind
        </h1>
        <p className="pt-3 text-[16px] md:text-[16px]">
          Securely bind your Mobile Legends account
        </p>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-end justify-center">
            <h1 className="w-fit text-center text-[12px] text-neutral-500">
              Please ensure that you have never bind this account with us
            </h1>
          </div>
        </div>
        <SyncForm currentUser={currentUser} />
      </div>
    </div>
  );
}
