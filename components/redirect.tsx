"use client";

import { useRouter } from "next/navigation";

const Redirect = ({ destination }: { destination?: string }) => {
  const router = useRouter();

  if (destination === "not-found") {
    router.push("/not-found");
  } else {
    router.push("/");
  }

  return null;
};

export default Redirect;
