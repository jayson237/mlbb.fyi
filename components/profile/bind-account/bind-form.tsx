"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SafeUser } from "@/types";

import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import LoadingDots from "@/components/shared/icons/loading-dots";

const bodyToast = (msg: string) => <div className="">{msg}</div>;

const toastStyle = {
  style: {
    backgroundColor: `background-color: rgb(137 111 242 / var(--tw-bg-opacity))`,
    borderWidth: "1px",
  },
};

interface BindFormProps {
  currentUser?: SafeUser | null;
}

const BindForm: React.FC<BindFormProps> = ({ currentUser }) => {
  const router = useRouter();
  const [form, setForm] = useState({
    accId: null,
    accServer: null,
    code: null,
  });
  const [loadingSend, setLoadingSend] = useState(false);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setLoadingSend(true);
        const sendCode = await fetch("/api/code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });
        const res = await sendCode.json();
        if (sendCode.status != 200) {
          toast(bodyToast(res?.message));
          setLoadingSend(false);
        } else {
          toast(bodyToast(res?.message));
          setLoadingSend(false);
          router.push(
            `/profile/stg/bind/verify?id=${form.accId}&id=${form.accServer}`
          );
        }
      }}
      className="mx-auto mt-8 flex max-w-md flex-col gap-y-2"
    >
      <Input
        type="number"
        onChange={handleChangeForm}
        name="accId"
        placeholder="ID"
        required
      />
      <Input
        type="number"
        onChange={handleChangeForm}
        name="accServer"
        placeholder="(Server)"
        required
      />
      <Button className="mt-4 rounded-lg" type="submit" disabled={loadingSend}>
        {loadingSend ? <LoadingDots color="#fafafa" /> : "Send Code"}
      </Button>
    </form>
  );
};

export default BindForm;
