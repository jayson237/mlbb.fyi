"use client";

import React, { useState } from "react";
import { Input } from "../shared/input";
import { Button } from "../shared/button";
import LoadingDots from "../shared/icons/loading-dots";
import { toast } from "sonner";

interface CommentProps {
  postId: string;
}

const CommentForm: React.FC<CommentProps> = ({ postId }) => {
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [messageCharacterCount, setMessageCharacterCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div>
      <form
        className="flex w-full flex-row gap-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          const fields = {
            postId: postId,
            message: message,
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
        <Button className="ml-8 rounded-full" variant="gradiantNavy">
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
  );
};

export default CommentForm;
