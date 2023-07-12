"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";

import { SendIcon } from "lucide-react";
import LoadingDots from "@/components/shared/icons/loading-dots";
import useMutCom from "@/lib/state/useMutCom";
import useAutosizeTextArea from "@/lib/state/useAutosizeTextArea";

interface CommentProps {
  postId: string;
  commentId: string;
}

const ReplyForm: React.FC<CommentProps> = ({ postId, commentId }) => {
  const togMut = useMutCom();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <div className="mt-1 grow">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const fields = {
            postId: postId,
            commentId: commentId,
            message: value,
          };

          const set = await fetch("/explore/stg/api/postReply", {
            method: "POST",
            body: JSON.stringify(fields),
          });
          const msg = await set.json();
          if (!set.ok) {
            setLoading(false);
            toast.error(msg.message);
          } else {
            setLoading(false);
            setValue("");
            toast.success(msg.message);
            togMut.togMut();
            setTimeout(() => {
              togMut.clamMut();
            }, 1000);
          }
        }}
      >
        <div className="flex flex-row items-end">
          <textarea
            id="review-text"
            className="w-full resize-none overflow-hidden rounded-lg border-b border-slate-700 bg-transparent px-3 py-2 text-slate-200 outline-none transition-all duration-500 focus:outline-none"
            onChange={(e) => {
              const inputValue = e.target.value;
              setValue(inputValue);
            }}
            placeholder="Add a reply"
            ref={textAreaRef}
            rows={1}
            value={value}
          />

          <button
            type="submit"
            className={`${
              value ? "" : "hidden hover:text-white"
            }mb-[1px] ml-2 cursor-pointer  hover:duration-300`}
            disabled={!value}
          >
            {loading ? (
              <div className="mb-2">
                <LoadingDots color="#FAFAFA" />
              </div>
            ) : (
              <SendIcon
                size={20}
                className="mb-[6px] rotate-45 hover:text-navy-300 hover:duration-300"
              />
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReplyForm;
