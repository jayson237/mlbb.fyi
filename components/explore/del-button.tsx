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
          router.push(`/explore`);
        }
      }}
      className="mb-8 mt-1 rounded-full"
      variant="gradiantNavy"
    >
      {loading ? (
        <>
          <LoadingDots color="#FAFAFA" />
        </>
      ) : (
        "Confirm"
      )}
    </Button>
  );
};

export default DeleteButton;
