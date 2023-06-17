"use client";

import { useRouter } from "next/navigation";

const RedirectNotFound = () => {
  const router = useRouter();

  router.push("/not-found");

  return null;
};

export default RedirectNotFound;
