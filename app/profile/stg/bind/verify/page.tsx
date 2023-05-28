import getCurrentUser from "@/lib/actions/getCurrentUser";
import getMlbbAcc from "@/lib/actions/getMlbbAcc";
import CodeForm from "@/components/profile/code-form";
import { Button } from "@/components/shared/button";
import Link from "next/link";

export default async function AppBindVerify() {
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
        <CodeForm currentUser={currentUser} />
      </div>
    </div>
  );
}
