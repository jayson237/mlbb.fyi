"use client";

import { useState } from "react";
import { Button } from "../shared/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoadingDots from "../shared/icons/loading-dots";

interface DeletePostProps {
  postId: string;
}

const DeleteButton: React.FC<DeletePostProps> = ({ postId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <>
      <p className="flex justify-center text-sm font-semibold">
        Click the button below to confirm deletion
      </p>
      <Button
        onClick={async (e) => {
          e.preventDefault();
          setLoading(true);
          const fields = {
            postId: postId,
          };

          const set = await fetch("/explore/stg/api/delete", {
            method: "POST",
            body: JSON.stringify(fields),
          });
          const msg = await set.json();
          if (!set.ok) {
            setLoading(false);
            toast.error(msg.message);
          } else {
            setLoading(false);
            toast.success(
              "Successfully delete post! Please wait to be redirected."
            );
            router.replace(`/explore`);
          }
        }}
        className="mx-auto w-[260px] rounded-lg"
        variant="destructive"
      >
        {loading ? (
          <>
            <LoadingDots color="#FAFAFA" />
          </>
        ) : (
          "Confirm"
        )}
      </Button>
    </>
  );
};

export default DeleteButton;
