"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "../shared/button";
import { Label } from "../shared/label";
import LoadingDots from "../shared/icons/loading-dots";
import { Post } from "@prisma/client";
import useAutosizeTextArea from "@/lib/useAutosizeTextArea";
import React from "react";

interface editPostProps {
  post: Post;
}

const EditForm: React.FC<editPostProps> = ({ post }) => {
  const [title, setTitle] = useState<string>(post.title);
  const [message, setMessage] = useState<string>(post.body);
  const [activate, setActivate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isTitleInputFocused, setIsTitleInputFocused] =
    useState<boolean>(false);
  const [isMessageInputFocused, setIsMessageInputFocused] =
    useState<boolean>(false);
  const [titleCharacterCount, setTitleCharacterCount] = useState<number>(
    post.title.length
  );
  const [messageCharacterCount, setMessageCharacterCount] = useState<number>(
    post.body.length
  );

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, message);

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
          className="flex w-full flex-col gap-3"
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const fields = {
              title: title,
              message: message,
              post: post,
            };

            const set = await fetch("/explore/stg/api/edit", {
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
          <div className="space-y-1">
            <Label htmlFor="body">Title</Label>
            <textarea
              placeholder="Insert title here"
              className="w-full resize-none overflow-hidden border border-gray-500 bg-transparent focus:border-white focus:outline-none"
              onChange={(e) => {
                const inputValue = e.target.value;
                setTitle(inputValue);
                setTitleCharacterCount(inputValue.length);
              }}
              onFocus={() => setIsTitleInputFocused(true)}
              onBlur={() => setIsTitleInputFocused(false)}
              maxLength={50}
              value={title}
              rows={1}
            />
            {isTitleInputFocused && (
              <p className="text-[10px] text-neutral-500">
                {titleCharacterCount} / {50} characters
              </p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="body">Message</Label>
            <textarea
              className="w-full resize-none overflow-hidden border border-gray-500 bg-transparent focus:border-white focus:outline-none"
              onChange={(e) => {
                const inputValue = e.target.value;
                setMessage(inputValue);
                setMessageCharacterCount(inputValue.length);
              }}
              onFocus={() => setIsMessageInputFocused(true)}
              onBlur={() => setIsMessageInputFocused(false)}
              maxLength={2000}
              placeholder="Insert message here"
              ref={textAreaRef}
              value={message}
              rows={1}
            />
            {isMessageInputFocused && (
              <p className="text-[10px] text-neutral-500">
                {messageCharacterCount} / {2000} characters
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <Button
              disabled={
                (post.title === title && post.body === message) ||
                !title ||
                !message
              }
              className="mb-8 mt-1 rounded-full"
              variant="gradiantNavy"
            >
              {loading ? (
                <>
                  <LoadingDots color="#FAFAFA" />
                </>
              ) : (
                "Edit"
              )}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
