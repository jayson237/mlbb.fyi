import getCurrentUser from "@/lib/actions/getCurrentUser";
import SyncForm from "@/components/profile/bind/bind-form";

export default async function AppBind() {
  const currentUser = await getCurrentUser();
  console.log(currentUser);
  return (
    <div className="mt-24">
      <div className="text-center">
        <h1 className="text-[44px] font-bold leading-10 tracking-tight md:text-[64px] md:leading-[60px]">
          Sync
        </h1>
        <p className="pt-3 text-[16px] md:text-[20px]">
          Sync your MLBB profile
        </p>
        <SyncForm currentUser={currentUser} />
      </div>
    </div>
  );
}
