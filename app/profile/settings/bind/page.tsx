import getCurrentUser from "@/lib/actions/getCurrentUser";
import SyncForm from "@/components/profile/bind-form";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";

export default async function AppBind() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email);

  if (mlbbAcc) return null;
  return (
    <div className="mt-24">
      <div className="text-center">
        <h1 className="text-[44px] font-bold leading-10 tracking-tight md:text-[64px] md:leading-[60px]">
          Bind
        </h1>
        <p className="pt-3 text-[16px] md:text-[20px]">
          Bind your Mobile Legends account
        </p>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-end justify-center">
            <h1 className="text-center text-[10px] text-neutral-500">
              Please make sure that you have never use this account to bind with
              us
            </h1>
          </div>
        </div>
        <SyncForm currentUser={currentUser} />
      </div>
    </div>
  );
}
