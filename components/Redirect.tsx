"use client";

import { useRouter } from "next/navigation";
import { SafeUser } from "@/types";

interface RedirectProps {
  redirectTo: string;
  currentUser?: SafeUser | null;
}

const Redirect: React.FC<RedirectProps> = ({ redirectTo, currentUser }) => {
  const router = useRouter();
  if (redirectTo === "profile") {
    router.push(`/profile/${currentUser?.username}`);
  } else {
    router.push(`/${redirectTo}`);
  }

  return null;
};

export default Redirect;
