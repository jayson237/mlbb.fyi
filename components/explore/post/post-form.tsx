"use client";

import useAutosizeTextArea from "@/lib/useAutosizeTextArea";

import { useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { SafeUser } from "@/types";

import { Button } from "@/components/shared/button";
import { GradiantCard } from "@/components/shared/gradiant-card";
import LoadingDots from "@/components/shared/icons/loading-dots";

const PostForm = ({ currUser }: { currUser?: SafeUser }) => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isTitleInputFocused, setIsTitleInputFocused] =
    useState<boolean>(false);
  const [isMessageInputFocused, setIsMessageInputFocused] =
    useState<boolean>(false);
  const [titleCharacterCount, setTitleCharacterCount] = useState<number>(0);
  const [messageCharacterCount, setMessageCharacterCount] = useState<number>(0);
  useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, message);

  return (
    <>
      <GradiantCard variant="clean">
        <h1 className="font-heading text-xl font-bold tracking-wide">
          Start a new discussion!
        </h1>
        <form
          className="mt-3 flex w-full flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const fields = {
              title: title,
              message: message,
            };

            const set = await fetch("/explore/stg/api/post", {
              method: "POST",
              body: JSON.stringify(fields),
            });
            const msg = await set.json();
            if (!set.ok) {
              setLoading(false);
              toast.error(msg.message);
            } else {
              setLoading(false);
              toast.success("Successfully posted! Please wait.");
              window.location.reload();
            }
          }}
        >
          {/* <Label htmlFor="title" className="font-light">
              Title
            </Label> */}
          <div className="flex h-fit items-center gap-2.5 rounded-lg p-2 pt-0">
            <Image
              src={(currUser?.image as string) || "/nana.jpg"}
              alt="image"
              width={48}
              height={48}
              className="h-auto w-auto rounded-full object-cover"
            />
            <textarea
              placeholder="Title"
              className="w-full resize-none overflow-hidden rounded-lg border-b border-slate-700 bg-transparent px-3 py-2 text-slate-200 outline-none transition-all duration-500 focus:outline-none"
              onChange={(e) => {
                const inputValue = e.target.value;
                setTitle(inputValue);
                setTitleCharacterCount(inputValue.length);
              }}
              // onFocus={() => setIsTitleInputFocused(true)}
              // onBlur={() => setIsTitleInputFocused(false)}
              maxLength={50}
              value={title}
              rows={1}
            />
          </div>
          {/* {isTitleInputFocused && (
            <p className="text-[10px] text-neutral-500">
              {titleCharacterCount} / {50} characters
            </p>
          )} */}
          <div className="space-y-1">
            {/* <Label htmlFor="body" className="font-light">
              Message
            </Label> */}
            <textarea
              className="w-full resize-none overflow-hidden rounded-lg border border-slate-700 bg-transparent p-3 text-slate-200 outline-none transition-all duration-100 focus:outline-none focus:ring"
              onChange={(e) => {
                const inputValue = e.target.value;
                setMessage(inputValue);
                setMessageCharacterCount(inputValue.length);
              }}
              onFocus={() => setIsMessageInputFocused(true)}
              onBlur={() => setIsMessageInputFocused(false)}
              maxLength={2000}
              placeholder="Message"
              ref={textAreaRef}
              value={message}
              rows={5}
            />
            {isMessageInputFocused && (
              <p className="text-[10px] text-neutral-500">
                {messageCharacterCount} / {2000} characters
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              className="mt-1 w-full rounded-2xl"
              variant="gradiantNavy"
              disabled={!title || !message}
            >
              {loading ? (
                <>
                  <LoadingDots color="#FAFAFA" />
                </>
              ) : (
                "Post"
              )}
            </Button>
          </div>
        </form>
      </GradiantCard>
    </>
  );
};

export default PostForm;
