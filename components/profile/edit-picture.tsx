// @ts-nocheck
"use client";

import { useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { SafeUser } from "@/types";

import { Button } from "@/components/shared/button";
import LoadingDots from "@/components/shared/icons/loading-dots";
import { Paperclip } from "lucide-react";
import { Slider } from "@mui/material";
import AvatarEditor from "react-avatar-editor";

interface EditPictureProps {
  currentUser?: SafeUser | null;
}

const EditPicture: React.FC<EditPictureProps> = ({ currentUser }) => {
  const editorRef = useRef(null);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const [slideValue, setSlideValue] = useState(10);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

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

  const updateImage = async (imageUrl: string) => {
    const set = await fetch(
      `/api/profile/editProfilePicture?id=${currentUser.id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ img: imageUrl }),
        cache: "no-store",
      }
    );
    const msg = await set.json();
    if (!set.ok) {
      setLoading(false);
      toast.error(msg.message);
      setButtonDisabled(false);
    } else {
      toast.success(
        "Successfully updated profile picture, kindly wait before making any more updates"
      );
      router.push(
        `/profile/${currentUser?.username ? currentUser?.username : "stg"}`
      );
    }
  };

  const handleUpload = async (dataUrl: string) => {
    const sign = await fetch("/profile/stg/api/cdn-sign");
    const data = await sign.json();
    const url =
      "https://api.cloudinary.com/v1_1/" + data.cloudname + "/auto/upload";
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append("file", dataUrl);
        formData.append("api_key", data.apikey);
        formData.append("timestamp", data.timestamp.toString());
        formData.append("signature", data.signature);
        formData.append("eager", data.eager);
        formData.append("folder", data.folder);

        const response = await fetch(url, {
          method: "POST",
          body: formData,
          cache: "no-store",
        });
        const result = await response.json();
        toast.success("Profile picture uploaded");
        // console.log(result.secure_url);
        updateImage(result.secure_url);
      } else {
        setLoading(false);
        setButtonDisabled(false);
        toast.error("There is no picture uploaded");
      }
    } catch (error) {
      setLoading(false);
      setButtonDisabled(false);
      toast.error("Failed to change profile picture, please try again");
    }
  };

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (editorRef) {
      const dataUrl = editorRef.current.getImageScaledToCanvas().toDataURL();
      setSelectedImage(dataUrl);
      handleUpload(dataUrl);
    } else {
      toast.error("Error saving your picture");
    }
  };

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center">
          {selectedImage && (
            <>
              <AvatarEditor
                ref={editorRef}
                image={selectedImage}
                width={150}
                height={150}
                border={0}
                borderRadius={150}
                color={[0, 0, 0, 0.72]}
                scale={slideValue / 10}
                rotate={0}
              />
              <Slider
                min={10}
                max={50}
                sx={{
                  margin: "0 auto",
                  width: "50%",
                  color: "##3652ba",
                }}
                size="medium"
                defaultValue={slideValue}
                value={slideValue}
                onChange={(e: any) => setSlideValue(e.target.value)}
              />
            </>
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
                Drag and drop file here, or click to select and replace file
              </p>
            </div>
          )}
        </div>

        <Button
          disabled={!selectedImage}
          onClick={(e) => {
            handleSave(e);
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
    </>
  );
};

export default EditPicture;
