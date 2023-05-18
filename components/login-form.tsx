"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import { signIn } from "next-auth/react";
import LoadingDots from "./shared/icons/loading-dots";
import { Button } from "./shared/button";
import { Input } from "./shared/input";
import Image from "next/image";

export default function LoginForm({ csrfToken }: { csrfToken?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto mt-14 max-w-md">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await signIn("email", {
            email,
            redirect: false,
            callbackUrl: "/",
          })
            .then((res) => {
              console.log(res);
              if (res?.ok) {
                toast.success("Kindly check login link in your inbox");
              }
              setLoading(false);
            })
            .catch((err) => {
              toast.error("something went wrong");
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
        <Button className="w-full" type="submit" disabled={loading}>
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
          className="w-full"
          onClick={() => {
            signIn("google", {
              callbackUrl: "/",
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
          className="w-full"
          onClick={() => {
            signIn("discord", {
              callbackUrl: "/",
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
