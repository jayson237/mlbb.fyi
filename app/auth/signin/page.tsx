import { getCsrfToken } from "next-auth/react";
import LoginForm from "@/components/login-form";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import Redirect from "@/components/Redirect";

export default async function Signin() {
  const csrfToken = await getCsrfToken();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return <Redirect />;
  }
  return (
    <main className="mt-24 h-screen">
      <div className="text-center">
        <h1 className="text-[44px] font-bold leading-10 tracking-tight md:text-[64px] md:leading-[60px]">
          Sign in
        </h1>
        <p className="pt-4 text-[16px] md:text-[16px]">
          Join the community and dominate the battlefield!
        </p>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-end justify-center">
            <h1 className="w-fit text-center text-[12px] text-neutral-500">
              Please check both your inbox and spam folders for the login link
            </h1>
          </div>
        </div>
      </div>
      <LoginForm csrfToken={csrfToken} />
    </main>
  );
}
