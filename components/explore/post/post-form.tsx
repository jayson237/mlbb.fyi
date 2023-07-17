"use client";

import useAutosizeTextArea from "@/lib/state/useAutosizeTextArea";

import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { Input } from "@/components/shared/input";

import { SafeUser } from "@/types";

import { Button } from "@/components/shared/button";
import { GradiantCard } from "@/components/shared/gradiant-card";
import LoadingDots from "@/components/shared/icons/loading-dots";
import { Paperclip } from "lucide-react";
import DialogFit from "@/components/shared/dialog-fit";
import { FileRejection, useDropzone } from "react-dropzone";
import { Label } from "@/components/shared/label";

const PostForm = ({ currUser }: { currUser?: SafeUser }) => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isMessageInputFocused, setIsMessageInputFocused] =
    useState<boolean>(false);
  const [titleCharacterCount, setTitleCharacterCount] = useState<number>(0);
  const [messageCharacterCount, setMessageCharacterCount] = useState<number>(0);
  useState<boolean>(false);

  const [tags, setTags] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, message);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        setSelectedImage(acceptedFiles[0]);
      }
    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, maxFiles: 1, maxSize: 5242880, multiple: false });

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const sign = await fetch("/profile/stg/api/cdn-sign");
    const data = await sign.json();
    const url =
      "https://api.cloudinary.com/v1_1/" + data.cloudname + "/auto/upload";
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append("file", selectedImage);
        formData.append("api_key", data.apikey);
        formData.append("timestamp", data.timestamp.toString());
        formData.append("signature", data.signature);
        formData.append("eager", data.eager);
        formData.append("folder", data.folder);

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const result = await response.json();

        toast.success("Picture uploaded, please close this window");
        setImageUrl(result.secure_url);
        setLoading(false);
        setButtonDisabled(false);
        setSelectedImage(null);
      } else {
        setLoading(false);
        setButtonDisabled(false);
        toast.error("There is no picture uploaded");
      }
    } catch (error) {
      setLoading(false);
      setButtonDisabled(false);
      toast.error("Failed to upload picture, please try again");
    }
  };

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
            let array: string[] = [];
            if (tags !== "") {
              const wordsInsideQuotes = tags.replace(/'/g, "");
              const elements = wordsInsideQuotes.split(",");

              array = elements.map((element) => element.trim().toLowerCase());
            }

            setLoading(true);
            const fields = {
              title: title,
              message: message,
              image: imageUrl,
              tags: array.slice(0, 3),
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
              maxLength={50}
              value={title}
              rows={1}
            />
          </div>

          <div className="space-y-1">
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
          <div className="space-y-1">
            <Label htmlFor="tags">Tags (Optional)</Label>
            <input
              type="text"
              placeholder={"Enter up to 3 tags (e.g. 'heroes', 'meta')"}
              value={tags}
              onChange={(e) => {
                const inputValue = e.target.value;
                setTags(inputValue);
              }}
              className="w-full resize-none overflow-hidden rounded-lg border border-slate-700 bg-transparent p-3 text-sm text-slate-200 outline-none transition-all duration-100 focus:outline-none focus:ring"
            />
          </div>

          <div className="flex items-center justify-end gap-2">
            <DialogFit
              title="Choose image (Max 5 MB)"
              triggerChild={
                <Paperclip className="mr-2 mt-1 cursor-pointer transition-all ease-in-out hover:text-navy-300 hover:duration-300" />
              }
            >
              <div>
                <div className="flex flex-col items-center justify-center">
                  {selectedImage && (
                    <Image
                      src={`${URL.createObjectURL(selectedImage)}`}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-auto w-auto"
                    />
                  )}
                </div>
                <div className="cursor-pointer text-sm" {...getRootProps()}>
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <div className="my-4 flex cursor-pointer flex-row items-center justify-center">
                      <Paperclip className="mr-1 mt-[1px] h-3 w-3" />
                      <p className="font-semiboldtext-decoration: text-sm underline underline-offset-2">
                        Drop file here
                      </p>
                    </div>
                  ) : (
                    <div className="my-4 flex cursor-pointer flex-row items-center justify-center">
                      <Paperclip className="mr-1 mt-[1px] h-3 w-3" />
                      <p className="text-decoration: text-sm font-semibold underline underline-offset-2">
                        Drag and drop file here, or click to select and replace
                        file
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  disabled={!selectedImage}
                  onClick={(e) => {
                    handleUpload(e);
                    setLoading(true);
                    setButtonDisabled(true);
                  }}
                  variant="gradiantNavy"
                  className="mt-4 w-full"
                >
                  {loading ? (
                    <>
                      <LoadingDots color="#FAFAFA" />
                    </>
                  ) : (
                    "Done"
                  )}
                </Button>
              </div>
            </DialogFit>
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
