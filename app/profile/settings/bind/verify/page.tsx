import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import CodeForm from "@/components/profile/code-form";

export default async function AppBindVerify() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email);
  if (mlbbAcc) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="mb-48 text-2xl md:ml-3">You have bound your account...</p>
      </div>
    );
  }

  return (
    <div className="mt-24">
      <div className="text-center">
        <h1 className="text-[44px] font-bold leading-10 tracking-tight md:text-[64px] md:leading-[60px]">
          Bind
        </h1>
        <p className="pt-3 text-[16px] md:text-[20px]">
          Kindly check your Mobile Legends inbox
        </p>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-end justify-center">
            <h1 className="w-fit text-center text-[12px] text-neutral-500">
              Please make sure that you have never used this account to bind
              with us
            </h1>
          </div>
        </div>
        <CodeForm currentUser={currentUser} />
      </div>
    </div>
  );
}
