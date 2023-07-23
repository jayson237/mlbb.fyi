"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "../../shared/button";
import LoadingDots from "../../shared/icons/loading-dots";

interface DeletePostProps {
  postId: string;
}

const DeletePost: React.FC<DeletePostProps> = ({ postId }) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-center text-sm font-semibold">
        Click the button below to confirm deletion
      </p>
      <Button
        onClick={async (e) => {
          e.preventDefault();
          setLoading(true);

          const set = await fetch("/explore/stg/api/delete", {
            method: "POST",
            body: JSON.stringify({
              postId,
            }),
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
        className="w-full"
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
    </div>
  );
};

export default DeletePost;
