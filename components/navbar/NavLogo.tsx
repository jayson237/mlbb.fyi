"use client";

import { useRouter } from "next/navigation";

const NavLogo = () => {
  const router = useRouter();
  return (
    <>
      <a
        onClick={() => {
          router.push("/");
        }}
        className="cursor-pointer text-xl font-bold tracking-tighter"
      >
        mlbb.fyi
      </a>
    </>
  );
};

export default NavLogo;
