"use client";

import React, { useState } from "react";
import { toast } from "sonner";

import { signIn } from "next-auth/react";
import LoadingDots from "./shared/icons/loading-dots";
import { Button } from "./shared/button";
import { Input } from "./shared/input";

export default function LoginForm({ csrfToken }: { csrfToken?: string }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
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
          {loading ? <LoadingDots color="#fafafa" /> : <p>Send login link</p>}
        </Button>
      </form>
    </>
  );
}
