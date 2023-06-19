"use client";

import useAutosizeTextArea from "@/lib/useAutosizeTextArea";
import { useRef, useState } from "react";
import Image from "next/image";

import { GradiantCard } from "../shared/gradiant-card";
import LoadingDots from "../shared/icons/loading-dots";
import { toast } from "sonner";
import { SendIcon } from "lucide-react";

interface CommentProps {
  postId: string;
  img: string;
}

const NewCommentForm: React.FC<CommentProps> = ({ postId, img }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <GradiantCard className="flex grow flex-row items-start" variant="clean">
      <Image
        src={
          img.split("/image/upload/")[0] +
            "/image/upload/c_fill,h_150,w_150/" +
            img.split("/image/upload/")[1] || "/nana.jpg"
        }
        alt=""
        width={48}
        height={48}
        className="mr-4 items-start rounded-full object-none object-left"
        placeholder="blur"
        blurDataURL={
          img?.split("/image/upload/")[0] +
          "/image/upload/e_blur:400,h_100,w_100/" +
          img?.split("/image/upload/")[1]
        }
      />
      <div className="mt-1 grow">
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
          <div className="flex flex-row items-end">
            <textarea
              id="review-text"
              className="font-mediumfocus:outline-none w-full resize-none overflow-hidden border border-transparent border-b-gray-500 bg-transparent py-1 focus:border-b-white"
              onChange={(e) => {
                const inputValue = e.target.value;
                setValue(inputValue);
              }}
              placeholder="Add a comment"
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
                <>
                  <LoadingDots color="#FAFAFA" />
                </>
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
    </GradiantCard>
  );
};

export default NewCommentForm;
