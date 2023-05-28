"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Input } from "../shared/input";
import { SafeUser } from "@/types";
import { Button } from "../shared/button";
import { useSearchParams } from "next/navigation";
import LoadingDots from "../shared/icons/loading-dots";

const bodyToast = (msg: string) => <div className="">{msg}</div>;
const toastStyle = {
  style: {
    backgroundColor: `background-color: rgb(137 111 242 / var(--tw-bg-opacity))`,
    borderWidth: "1px",
  },
};

interface CodeFormProps {
  currentUser?: SafeUser | null;
}
const CodeForm: React.FC<CodeFormProps> = ({ currentUser }) => {
  const params = useSearchParams();
  const router = useRouter();

  const accId = params?.getAll("id")[0];
  const accServer = params?.getAll("id")[1];
  console.log(params?.getAll);

  const [form, setForm] = useState({
    accId: accId ? accId : null,
    accServer: accServer ? accServer : null,
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
        const bind = await fetch("/profile/settings/api/bind", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form, email: currentUser?.email }),
        });
        const res = await bind.json();
        if (bind.status != 200) {
          toast(bodyToast(res?.message));
          setLoadingSend(false);
        } else {
          toast(bodyToast(res?.message));
          setLoadingSend(false);
          router.push(`/profile/${currentUser?.username}`);
        }
      }}
      className="mx-auto mt-8 flex max-w-md flex-col gap-y-2"
    >
      <Input
        type="number"
        onChange={handleChangeForm}
        placeholder="Code"
        name="code"
        required
      />
      <Button className="mt-4" type="submit" disabled={loadingSend}>
        {loadingSend ? <LoadingDots color="#fafafa" /> : "Bind"}
      </Button>
    </form>
  );
};

export default CodeForm;
