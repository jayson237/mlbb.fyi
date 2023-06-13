"use client";

import useAutosizeTextArea from "@/lib/useAutosizeTextArea";
import { useRef, useState } from "react";
import { Button } from "../shared/button";
import LoadingDots from "../shared/icons/loading-dots";
import { toast } from "sonner";

interface CommentProps {
  postId: string;
}

const NewCommentForm: React.FC<CommentProps> = ({ postId }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const fields = {
              postId: postId,
              message: value,
            };

            const set = await fetch("/explore/stg/api/postComment", {
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
            className="w-full resize-none overflow-hidden border border-transparent border-b-gray-500 bg-transparent focus:border-b-white focus:outline-none"
            onChange={(e) => {
              const inputValue = e.target.value;
              setValue(inputValue);
            }}
            placeholder="Add a comment"
            ref={textAreaRef}
            rows={1}
            value={value}
          />
          <div className="flex justify-end"></div>
          <div className="flex justify-end">
            <Button
              className="mb-8 mt-1 rounded-full"
              variant="gradiantNavy"
              disabled={!value}
            >
              {loading ? (
                <>
                  <LoadingDots color="#FAFAFA" />
                </>
              ) : (
                "Comment"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default NewCommentForm;
