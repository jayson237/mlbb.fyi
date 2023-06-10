import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import Image from "next/image";

import { SafeUser } from "@/types";

import { Button } from "@/components/shared/button";
import LoadingDots from "@/components/shared/icons/loading-dots";
import { Paperclip } from "lucide-react";
import AvatarEditor from "react-avatar-editor";

interface EditPictureProps {
  currentUser?: SafeUser | null;
}

const EditPicture: React.FC<EditPictureProps> = ({ currentUser }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

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
    const set = await fetch("/profile/stg/api/edit-picture", {
      method: "POST",
      body: JSON.stringify({ img: imageUrl }),
    });
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

  const handleUpload = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
        toast.success("Profile picture uploaded");
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

  return (
    <>
      <div>
        <div className="flex justify-center">
          {selectedImage && (
            <AvatarEditor
              image={`${URL.createObjectURL(selectedImage)}`}
              width={150}
              height={150}
              border={20}
              borderRadius={100}
              color={[50, 50, 50, 0.6]}
              className="h-[150px] w-[150px]"
            />
          )}
        </div>
        <div className="cursor-pointer text-sm" {...getRootProps()}>
          <input {...getInputProps()} />

          {isDragActive ? (
            <div className="my-4 flex cursor-pointer flex-row items-center justify-center">
              <Paperclip className="mr-1 mt-[1px] h-3 w-3" />
              <p className="text-decoration: underline underline-offset-2">
                Drop file here
              </p>
            </div>
          ) : (
            <div className="my-4 flex cursor-pointer flex-row items-center justify-center">
              <Paperclip className="mr-1 mt-[1px] h-3 w-3" />
              <p className="text-decoration: underline underline-offset-2">
                Drag and drop file here, or click to select and replace file
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
    </>
  );
};

export default EditPicture;
