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
    router.push(`/profile/${profileUsername}/statistics`);
  }

  return null;
}
