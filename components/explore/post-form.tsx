"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Input } from "../shared/input";
import { Button } from "../shared/button";
import { Label } from "../shared/label";
import LoadingDots from "../shared/icons/loading-dots";

const PostForm = () => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [titleCharacterCount, setTitleCharacterCount] = useState<number>(0);
  const [messageCharacterCount, setMessageCharacterCount] = useState<number>(0);

  return (
    <>
      <h1 className="text-center font-heading text-3xl font-bold">
        Post New Topic
      </h1>
      <div className="mx-auto max-w-md">
        <form
          className="flex w-full flex-col gap-3"
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
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input
              type="title"
              placeholder="Title"
              onChange={(e) => {
                const inputValue = e.target.value;
                setTitle(inputValue);
                setTitleCharacterCount(inputValue.length);
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              name="title"
              maxLength={50}
            />
            {isInputFocused && (
              <p className="text-[10px] text-neutral-500">
                {titleCharacterCount} / {50} characters
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="body">Message</Label>
            <Input
              type="Body"
              onChange={(e) => {
                const inputValue = e.target.value;
                setMessage(inputValue);
                setMessageCharacterCount(inputValue.length);
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              name="body"
              maxLength={2000}
            />
            {isInputFocused && (
              <p className="text-[10px] text-neutral-500">
                {messageCharacterCount} / {2000} characters
              </p>
            )}
          </div>

          <Button className="mb-8 mt-1 rounded-full" variant="gradiantNavy">
            {loading ? (
              <>
                <LoadingDots color="#FAFAFA" />
              </>
            ) : (
              "Post"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default PostForm;
