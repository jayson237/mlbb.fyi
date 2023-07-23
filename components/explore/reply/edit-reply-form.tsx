"use client";

import useAutosizeTextArea from "@/lib/state/useAutosizeTextArea";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { revalPath } from "@/lib/revalidate";

import { Button } from "@/components/shared/button";
import LoadingDots from "@/components/shared/icons/loading-dots";

interface EditReplyProps {
  replyId: string;
  replyBody: string;
  onCancel: () => void;
}

const EditReplyForm: React.FC<EditReplyProps> = ({
  replyId,
  replyBody,
  onCancel,
}) => {
  const [value, setValue] = useState<string>(replyBody);
  const [activate, setActivate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isCommentInputFocused, setIsCommentInputFocused] =
    useState<boolean>(false);
  const [commentCharacterCount, setCommentCharacterCount] = useState<number>(
    replyBody.length
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

  const handleCancel = () => {
    onCancel();
  };

  return (
    <>
      <div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const fields = {
              replyId: replyId,
              message: value,
            };

            const set = await fetch("/explore/stg/api/repEdit", {
              method: "POST",
              body: JSON.stringify(fields),
            });
            const msg = await set.json();
            if (!set.ok) {
              setLoading(false);
              toast.error(msg.message);
            } else {
              handleCancel();
              revalPath("/explore" + replyId);
              setLoading(false);
              toast.success(msg.message);
            }
          }}
        >
          <textarea
            className="w-full resize-none overflow-hidden rounded-lg border border-slate-700 bg-transparent p-3 text-slate-200 outline-none focus:outline-none focus:ring"
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
              className="mb-2 mr-4 mt-1 w-24 rounded-2xl"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              className="mb-2 mt-1 w-24 rounded-2xl"
              variant="gradiantNavy"
              disabled={!value || value === replyBody}
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

export default EditReplyForm;
