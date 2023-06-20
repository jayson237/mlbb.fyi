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
  const [value, setValue] = useState<string>(commentBody);
  const [activate, setActivate] = useState<boolean>(false); //Just to make sure the useEffect always activate once entering the page
  const [loading, setLoading] = useState<boolean>(false);
  const [isCommentInputFocused, setIsCommentInputFocused] =
    useState<boolean>(false);
  const [commentCharacterCount, setCommentCharacterCount] = useState<number>(
    commentBody.length
  );

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }

    setActivate(!activate);
  }, [activate]);

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
            className="w-full resize-none overflow-hidden border border-gray-500 bg-transparent focus:border-white focus:outline-none"
            onChange={(e) => {
              const inputValue = e.target.value;
              setValue(inputValue);
              setCommentCharacterCount(inputValue.length);
            }}
            placeholder="Add a comment"
            onFocus={() => setIsCommentInputFocused(true)}
            onBlur={() => setIsCommentInputFocused(false)}
            maxLength={1000}
            ref={textAreaRef}
            value={value}
          />
          {isCommentInputFocused && (
            <p className="text-[10px] text-neutral-500">
              {commentCharacterCount} / {1000} characters
            </p>
          )}
          <div className="flex justify-end">
            <Button
              className="mb-8 mt-1 rounded-2xl"
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
