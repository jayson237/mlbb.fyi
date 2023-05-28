import getCurrentUser from "@/lib/actions/getCurrentUser";
import SyncForm from "@/components/profile/bind-form";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import Redirect from "@/components/Redirect";
import { Button } from "@/components/shared/button";
import Link from "next/link";

export default async function AppBind() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email);
  if (mlbbAcc) {
    return (
      <div className="mt-48">
        <div className="mx-auto flex max-w-xl flex-col justify-center text-center">
          <p className="pt-3 text-[16px] md:text-2xl">
            You have previously bound your Mobile Legends account
          </p>
          <Button
            className="mx-auto mt-4 w-fit rounded-full"
            variant="gradiantNavySec"
          >
            <Link href="/profile/stg">Back to settings</Link>
          </Button>
        </div>
      </div>
    );
  } else if (!currentUser) {
    return (
      <div className="mt-48">
        <div className="mx-auto flex max-w-xl flex-col justify-center text-center">
          <p className="pt-3 text-[16px] md:text-2xl">Please sign in first</p>
          <Button
            className="mx-auto mt-4 w-fit rounded-full"
            variant="gradiantNavySec"
          >
            <Link href="/auth/signin">Sign in here</Link>
          </Button>
        </div>
      </div>
    );
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
