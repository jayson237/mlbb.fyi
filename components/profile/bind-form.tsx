"use client";

import { useState } from "react";
import { toast } from "sonner";
import { SafeUser } from "@/types";
import LoadingDots from "@/components/shared/icons/loading-dots";
import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";

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
        const bind = await fetch("/profile/settings/api/bind", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...form, email: currentUser?.email }),
        });
        const res = await bind.json();
        console.log(res);
        if (bind.status != 200) {
          toast(bodyToast(res?.message));
        } else {
          toast(bodyToast(res?.message));
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
        placeholder="Server"
        required
      />
      <div className="flex w-full items-center space-x-2">
        <Input
          type="number"
          onChange={handleChangeForm}
          placeholder="Code"
          name="code"
          required
        />
        <Button
          type="submit"
          id="verifCode"
          variant={"outline"}
          onClick={async (e) => {
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
            console.log(res);
            if (sendCode.status != 200) {
              toast(bodyToast(res?.message));
              setLoadingSend(false);
            } else {
              toast(bodyToast(res?.message));
              setLoadingSend(false);
            }
          }}
          disabled={loadingSend}
        >
          {loadingSend ? <LoadingDots color="#fafafa" /> : "Send"}
        </Button>
      </div>
      <Button className="mt-4" type="submit">
        Submit
      </Button>
    </form>
  );
};

export default BindForm;
