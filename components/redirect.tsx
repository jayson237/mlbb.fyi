"use client";

import { useRouter } from "next/navigation";

const Redirect = () => {
  const router = useRouter();

  router.push("/");

  return null;
};

export default Redirect;
