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
          Signin
        </h1>
        <p className="pt-3 text-[16px] md:text-[20px]">
          Please enter your email before proceeding
        </p>
      </div>
      <LoginForm csrfToken={csrfToken} />
    </main>
  );
}
