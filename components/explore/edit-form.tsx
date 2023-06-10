"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { SafeUser } from "@/types";
import { Input } from "../shared/input";
import { Button } from "../shared/button";
import { Label } from "../shared/label";
import LoadingDots from "../shared/icons/loading-dots";
import getCurrentPost from "@/lib/actions/getCurrentPost";
import { Post } from "@prisma/client";

interface editPostProps {
  post: Post;
}

const EditForm: React.FC<editPostProps> = ({ post }) => {
  const router = useRouter();

  const [title, setTitle] = useState<string>(post.title);
  const [message, setMessage] = useState<string>(post.body);
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

  return (
    <>
      <h1 className="text-center font-heading text-3xl font-bold">Edit</h1>
      <div className="mx-auto max-w-md">
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
            <Label htmlFor="title">Title</Label>
            <Input
              type="title"
              placeholder="Insert title here"
              defaultValue={post.title}
              onChange={(e) => {
                const inputValue = e.target.value;
                setTitle(inputValue);
                setTitleCharacterCount(inputValue.length);
              }}
              onFocus={() => setIsTitleInputFocused(true)}
              onBlur={() => setIsTitleInputFocused(false)}
              name="title"
              maxLength={50}
            />
            {isTitleInputFocused && (
              <p className="text-[10px] text-neutral-500">
                {titleCharacterCount} / {50} characters
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="body">Message</Label>
            <Input
              type="Body"
              placeholder="Insert message here"
              defaultValue={post.body}
              onChange={(e) => {
                const inputValue = e.target.value;
                setMessage(inputValue);
                setMessageCharacterCount(inputValue.length);
              }}
              onFocus={() => setIsMessageInputFocused(true)}
              onBlur={() => setIsMessageInputFocused(false)}
              name="body"
              maxLength={2000}
            />
            {isMessageInputFocused && (
              <p className="text-[10px] text-neutral-500">
                {messageCharacterCount} / {2000} characters
              </p>
            )}
          </div>

          <Button
            disabled={post.title === title && post.body === message}
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
        </form>
      </div>
    </>
  );
};

export default EditForm;
