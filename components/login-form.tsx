"use client";

import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import { signIn } from "next-auth/react";
import LoadingDots from "./shared/icons/loading-dots";
import { Button } from "./shared/button";
import { Input } from "./shared/input";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function LoginForm({ csrfToken }: { csrfToken?: string }) {
  const params = useSearchParams();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (params?.get("error") === "OAuthAccountNotLinked") {
      toast.error(
        "Your email has been registered with a different sign-in method"
      );
    }
  }, [params]);

  return (
    <div className="mx-auto mt-14 max-w-md">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await signIn("email", {
            email,
            redirect: false,
            callbackUrl: "/profile/stg?ref=signin",
          })
            .then((res) => {
              //console.log(res);
              if (res?.ok) {
                toast.success(
                  "Kindly check your inbox or spam folders for the login link"
                );
              }
              setLoading(false);
            })
            .catch((err) => {
              toast.error("Something went wrong");
              setLoading(false);
            });
        }}
        className="mx-auto mt-14 max-w-md space-y-2"
      >
        <Input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Input
          type="email"
          id="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <Button className="w-full rounded-lg" type="submit" disabled={loading}>
          {loading ? <LoadingDots color="#fafafa" /> : <p>Login</p>}
        </Button>
      </form>
      <div className="relative mt-4">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="text-xs relative flex justify-center">
          <span className="text-muted-foreground bg-[#151515] px-2">
            or sign in with
          </span>
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        <Button
          className="w-full rounded-lg"
          onClick={() => {
            signIn("google", {
              callbackUrl: "/profile/stg?ref=signin",
            });
          }}
        >
          <Image
            className="mr-1"
            src={"/google.svg"}
            alt="Google"
            width="20"
            height="20"
          />
          Google
        </Button>
        <Button
          className="w-full rounded-lg"
          onClick={() => {
            signIn("discord", {
              callbackUrl: "/profile/stg?ref=signin",
            });
          }}
        >
          <Image
            className="mr-1"
            src={"/discord.svg"}
            alt="Discord"
            width="20"
            height="20"
          />
          Discord
        </Button>
      </div>
    </div>
  );
}
