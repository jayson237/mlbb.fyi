"use client";

import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { SafeUser } from "@/types";
import { Input } from "../shared/input";
import { Button } from "../shared/button";
import { Label } from "../shared/label";
import LoadingDots from "../shared/icons/loading-dots";
import { CheckCircle, XCircle } from "lucide-react";
import { MlbbAcc } from "@prisma/client";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import { Accept, FileRejection, useDropzone } from "react-dropzone";

interface ISettingsForm {
  currentUser?: SafeUser | null;
  mlbbAcc?: MlbbAcc | null;
}

const SettingsForm: React.FC<ISettingsForm> = ({ currentUser, mlbbAcc }) => {
  const params = useSearchParams();
  const router = useRouter();

  const [username, setUsername] = useState(currentUser?.username || "");
  const [description, setDescription] = useState(currentUser?.desc || "");
  const [link1, setLink1] = useState(currentUser?.links[0] || "");
  const [link2, setLink2] = useState(currentUser?.links[1] || "");
  const [link3, setLink3] = useState(currentUser?.links[2] || "");
  const [image, setImage] = useState("");

  const [selectedImages, setSelectedImages] = useState([]);

  const onDrop = useCallback(
    // @ts-ignore
    (acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      acceptedFiles.forEach((file) => {
        // @ts-ignore
        setSelectedImages((prevState): never[] => [...prevState, file]);
      });
    },
    []
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop, maxFiles: 1, maxSize: 5242880 });

  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [characterCount, setCharacterCount] = useState(
    currentUser?.desc ? currentUser.desc.length : 0
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const sign = await fetch("/profile/stg/api/cdn-sign");
    const data = await sign.json();
    const url =
      "https://api.cloudinary.com/v1_1/" + data.cloudname + "/auto/upload";
    try {
      const formData = new FormData();

      // const files = e.target.files
      if (selectedImages) {
        formData.append("file", selectedImages[0]);
        formData.append("api_key", data.apikey);
        formData.append("timestamp", data.timestamp.toString());
        formData.append("signature", data.signature);
        formData.append("eager", data.eager);
        formData.append("folder", data.folder);
        // formData.append("public_id", currentUser?.username as string);

        const response = await fetch(url, {
          method: "POST",
          body: formData,
        });
        const result = await response.json();
        console.log(result);
        setImage(result.secure_url);
        console.log(image);
        alert("Upload was successful");
      } else {
        alert("No files");
      }
    } catch (error) {
      console.log("Failed to upload", error);
    }
  };

  if (currentUser?.username && params?.get("ref") === "signin") {
    router.push("/explore");
    return null;
  }

  return (
    <>
      <h1 className="text-center font-heading text-3xl font-bold">
        Profile Settings
      </h1>
      <div className="mx-auto max-w-md">
        <div className="mb-8 flex justify-center">
          <Button
            className="h-fit w-fit gap-2 rounded-full py-1"
            onClick={() => {
              router.push("/profile/stg/bind");
            }}
            disabled={mlbbAcc ? true : false}
          >
            Mobile Legends Account
            {mlbbAcc ? (
              <>
                <span>{`: ${mlbbAcc.accId} (${mlbbAcc.nickname})`}</span>
                <CheckCircle
                  className={cn(
                    "h-4 w-4",
                    mlbbAcc ? "text-green-500" : "text-red-500"
                  )}
                />
              </>
            ) : (
              <XCircle
                className={cn(
                  "h-4 w-4",
                  mlbbAcc ? "text-green-500" : "text-red-500"
                )}
              />
            )}
          </Button>
        </div>

        <form className="flex w-full flex-col gap-3">
          <div className="relative mx-auto h-[150px] w-[150px] overflow-hidden rounded-full">
            <Image
              src={
                currentUser?.image?.split("/image/upload/")[0] +
                  "/image/upload/c_fill,h_150,w_150/" +
                  currentUser?.image?.split("/image/upload/")[1] || "/nana.jpg"
              }
              alt=""
              width={150}
              height={150}
              className="mx-auto h-auto w-auto bg-contain bg-center"
              placeholder="blur"
              blurDataURL={
                currentUser?.image?.split("/image/upload/")[0] +
                "/image/upload/e_blur:400,h_100,w_100/" +
                currentUser?.image?.split("/image/upload/")[1]
              }
            />
          </div>
          <div className="">
            <Label htmlFor="picture">Set profile picture</Label>
            <div className="cursor-pointer text-sm" {...getRootProps()}>
              <input {...getInputProps()} />

              {isDragActive ? (
                <p>Drop file(s) here ...</p>
              ) : (
                <p>Drag and drop file(s) here, or click to select files </p>
              )}
            </div>
            <div className="">
              {selectedImages.length > 0 &&
                selectedImages.map((image, index) => (
                  <Image
                    src={`${URL.createObjectURL(image)}`}
                    key={index}
                    alt=""
                    width={150}
                    height={150}
                    className="h-auto w-auto"
                  />
                ))}
            </div>
            <Button
              onClick={(e) => handleUpload(e)}
              variant="gradiantNavy"
              className="mt-4"
            >
              Done
            </Button>
          </div>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              value={currentUser?.email}
              name="email"
              disabled
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              defaultValue={currentUser?.username || ""}
              name="username"
              maxLength={20}
              required
              pattern="[a-z0-9]{4,}"
              className="peer"
            />
            <p className="invisible absolute text-sm text-red-500 peer-invalid:visible peer-invalid:static peer-invalid:mt-2">
              Please provide a minimum of 4 characters without any uppercase and
              special characters
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              type="text"
              placeholder="Description"
              onChange={(e) => {
                const inputValue = e.target.value;
                setDescription(inputValue);
                setCharacterCount(inputValue.length);
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              defaultValue={currentUser?.desc || ""}
              name="description"
              maxLength={50}
            />
            {isInputFocused && (
              <p className="text-[10px] text-neutral-500">
                {characterCount} / {50} characters
              </p>
            )}
          </div>

          <Label htmlFor="social" className="mt-2">
            Social Links (Optional)
          </Label>
          <div className="space-y-4">
            <div>
              <Input
                type="url"
                placeholder="Link to social profile"
                onChange={(e) => setLink1(e.target.value)}
                defaultValue={currentUser?.links[0] || ""}
                name="link1"
              />
            </div>
            <div>
              <Input
                type="url"
                placeholder="Link to social profile"
                onChange={(e) => setLink2(e.target.value)}
                defaultValue={currentUser?.links[1] || ""}
                name="link2"
              />
            </div>
            <div>
              <Input
                type="url"
                placeholder="Link to social profile"
                onChange={(e) => setLink3(e.target.value)}
                defaultValue={currentUser?.links[2] || ""}
                name="link3"
              />
            </div>
          </div>

          <Button
            disabled={
              (username === currentUser?.username &&
                description === currentUser?.desc &&
                link1 === currentUser?.links[0] &&
                link2 === currentUser?.links[1] &&
                link3 === currentUser?.links[2]) ||
              buttonDisabled
            }
            className="mb-8 mt-1"
            variant="gradiantNavy"
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              setButtonDisabled(true);
              const fields = {
                username: username,
                description: description,
                links: [link1, link2, link3],
                img: image,
              };

              const set = await fetch("/profile/stg/api/update", {
                method: "POST",
                body: JSON.stringify(fields),
              });
              const msg = await set.json();
              if (!set.ok) {
                setLoading(false);
                toast.error(msg.message);
                setButtonDisabled(false);
              } else {
                setLoading(false);
                toast.success(
                  "Successfully updated profile, kindly wait before making any more updates"
                );
                router.push(`/profile/${username}`);
              }
            }}
          >
            {loading ? (
              <>
                <LoadingDots color="#FAFAFA" />
              </>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </div>
    </>
  );
};

export default SettingsForm;
