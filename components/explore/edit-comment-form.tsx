"use client";

import useAutosizeTextArea from "@/lib/useAutosizeTextArea";
import { useEffect, useRef, useState } from "react";
import { Button } from "../shared/button";
import LoadingDots from "../shared/icons/loading-dots";
import { toast } from "sonner";

interface EditCommentProps {
  commentId: string;
  commentBody: string;
}

const EditCommentForm: React.FC<EditCommentProps> = ({
  commentId,
  commentBody,
}) => {
  const [value, setValue] = useState(commentBody);
  const [loading, setLoading] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, []);

  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const fields = {
              commentId: commentId,
              message: value,
            };

            const set = await fetch("/explore/stg/api/comEdit", {
              method: "POST",
              body: JSON.stringify(fields),
            });
            const msg = await set.json();
            if (!set.ok) {
              setLoading(false);
              toast.error(msg.message);
            } else {
              setLoading(false);
              toast.success(msg.message);
              window.location.reload();
            }
          }}
        >
          <textarea
            id="review-text"
            className="w-full resize-none overflow-hidden border border-gray-500 bg-transparent focus:border-white focus:outline-none"
            onChange={(e) => {
              const inputValue = e.target.value;
              setValue(inputValue);
            }}
            placeholder="Add a comment"
            ref={textAreaRef}
            value={value}
          />
          <div className="flex justify-end">
            <Button
              className="mb-8 mt-1 rounded-full"
              variant="gradiantNavy"
              disabled={!value || value === commentBody}
            >
              {loading ? (
                <>
                  <LoadingDots color="#FAFAFA" />
                </>
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditCommentForm;
