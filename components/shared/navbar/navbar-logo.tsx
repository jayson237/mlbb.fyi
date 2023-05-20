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
        className="cursor-pointer font-heading text-[24px]"
      >
        mlbb.fyi
      </a>
    </>
  );
};

export default NavLogo;
