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
        <SyncForm currentUser={currentUser} />
      </div>
    </div>
  );
}
