"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/shared/button";
import { Label } from "@/components/shared/label";
import LoadingDots from "@/components/shared/icons/loading-dots";
import { Post } from "@prisma/client";
import useAutosizeTextArea from "@/lib/useAutosizeTextArea";
import React from "react";

interface editPostProps {
  post: Post;
  onCancel: () => void;
}

const EditForm: React.FC<editPostProps> = ({ post, onCancel }) => {
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

  const handleCancel = () => {
    onCancel();
  };

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
              className="w-full resize-none overflow-hidden rounded-lg border-b border-slate-700 bg-transparent px-3 py-2 text-slate-200 outline-none transition-all duration-500 focus:outline-none"
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
              className="w-full resize-none overflow-hidden rounded-lg border border-slate-700 bg-transparent p-3 text-slate-200 outline-none focus:outline-none focus:ring"
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
              className="mb-8 mr-4 mt-1 w-24 rounded-2xl"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              disabled={
                (post.title === title && post.body === message) ||
                !title ||
                !message
              }
              className="mb-8 mt-1 w-24 rounded-2xl"
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
          </div>
        </form>
      </div>
    </>
  );
};

export default EditForm;
