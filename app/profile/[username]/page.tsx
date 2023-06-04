"use client";

import { useRouter } from "next/navigation";

export default function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const router = useRouter();
  const profileUsername = params.username;

  if (typeof window !== "undefined") {
    // Code inside this block will only execute on the client-side
    router.push(`/profile/${profileUsername}/statistics`);
  }

  return null;
}
