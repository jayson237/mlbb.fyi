"use client";

import { useRouter } from "next/navigation";

const NavLogo = () => {
  const router = useRouter();
  return (
    <>
      <h1
        onClick={() => router.push("/")}
        className="cursor-pointer font-heading text-[24px]"
      >
        mlbb.fyi
      </h1>
    </>
  );
};

export default NavLogo;
