"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { SafeUser } from "@/types";
import { Input } from "../shared/input";
import { Button } from "../shared/button";
import { Label } from "../shared/label";
import LoadingDots from "../shared/icons/loading-dots";
import { CheckCircle, XCircle } from "lucide-react";
import { mlbbaccs } from "@prisma/client";
import { cn } from "@/lib/utils";

interface ISettingsForm {
  currentUser?: SafeUser | null;
  mlbbAcc?: mlbbaccs | null;
}

const SettingsForm: React.FC<ISettingsForm> = ({ currentUser, mlbbAcc }) => {
  const router = useRouter();

  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-8 flex justify-center">
        <Button
          className="h-fit w-fit gap-2 rounded-full py-1"
          onClick={() => {
            router.push("/profile/settings/bind");
          }}
          disabled={mlbbAcc ? true : false}
        >
          MLBB Account
          {mlbbAcc ? (
            <>
              <span>{`: ${mlbbAcc.accId}(${mlbbAcc.nickname})`}</span>
              <CheckCircle
                className={cn(
                  "h-4 w-4",
                  mlbbAcc ? "text-green-500" : "text-red-500"
                )}
              />
            </>
          ) : (
            <XCircle
              className={cn(
                "h-4 w-4",
                mlbbAcc ? "text-green-500" : "text-red-500"
              )}
            />
          )}
        </Button>
      </div>

      <form
        className="flex w-full flex-col gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const set = await fetch("/profile/settings/api/username", {
            method: "POST",
            body: JSON.stringify({
              username: username,
            }),
          });
          if (!set.ok) {
            setLoading(false);
            toast.error("Error updating profile");
          } else {
            setLoading(false);
            toast.success("Successfully updated profile");
            router.push("/explore");
          }
        }}
      >
        <div className="relative z-20 mx-auto h-[150px] w-[150px] rounded-full hover:fill-white">
          <Image
            src={(currentUser?.image as string) || "/nana.jpg"}
            alt="Profile Picture"
            width={150}
            height={150}
            className="absolute inset-0 z-[-2] mx-auto rounded-full"
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            placeholder="Email"
            value={currentUser?.email}
            name="email"
            disabled
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            defaultValue={currentUser?.username || ""}
            name="username"
            maxLength={20}
            required
            pattern="[a-z0-9]{4,}"
            className="peer"
          />
          <p className="invisible absolute text-sm text-red-500 peer-invalid:visible peer-invalid:static peer-invalid:mt-2">
            Please provide a minimum of 4 characters without any uppercase and
            special characters
          </p>
        </div>

        <Button className="mt-1 rounded-full" variant="gradiantNavy">
          {loading ? (
            <>
              <LoadingDots color="#FAFAFA" />
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </div>
  );
};

export default SettingsForm;
