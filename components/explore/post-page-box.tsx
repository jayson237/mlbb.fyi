"use client";

import { SafeUser } from "@/types";

import { Post, User } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Edit3, Star, Trash2 } from "lucide-react";
import DelDialog from "./del-dialog";
import DeleteButton from "./del-button";
import EditForm from "./edit-form";
import { toast } from "sonner";
import LoadingDots from "../shared/icons/loading-dots";

interface PostPageProp {
  post: Post;
  user: User | null;
  currUser?: SafeUser | null;
}

const PostPageBox: React.FC<PostPageProp> = ({ post, user, currUser }) => {
  const isCurrUserFollowing = currUser?.favourite.includes(post.id as string);

  const [editActive, setEditActive] = useState<boolean>(false);
  const [favourite, setFavourite] = useState(isCurrUserFollowing);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div className="mb-3 mt-8 flex flex-row items-center">
          <Image
            src={
              user?.image?.split("/image/upload/")[0] +
                "/image/upload/c_fill,h_150,w_150/" +
                user?.image?.split("/image/upload/")[1] || "/nana.jpg"
            }
            alt=""
            width={40}
            height={40}
            className="mr-4 object-none object-left"
            placeholder="blur"
            blurDataURL={
              user?.image?.split("/image/upload/")[0] +
              "/image/upload/e_blur:400,h_100,w_100/" +
              user?.image?.split("/image/upload/")[1]
            }
          />
          <Link href={`/profile/${post.createdBy}/statistics`}>
            <p className="font-semibold">{post?.createdBy}</p>
          </Link>
        </div>
        {currUser && currUser.username === user?.username && (
          <div className="flex flex-row">
            <button onClick={() => setEditActive(!editActive)}>
              {editActive ? (
                <Edit3 color="#00ff40" strokeWidth={3} className="mr-5" />
              ) : (
                <Edit3 className="mr-5" />
              )}
            </button>
            <DelDialog title="Delete" triggerChild={<Trash2 />}>
              <p className="flex justify-center">
                Click the button below to confirm deletion
              </p>
              <DeleteButton postId={post.id} />
            </DelDialog>
          </div>
        )}
        {currUser && currUser.username !== user?.username && !favourite && (
          <button
            onClick={async () => {
              setLoading(true);
              const fields = {
                postId: post.id,
              };
              const set = await fetch("/explore/stg/api/favourite", {
                method: "POST",
                body: JSON.stringify(fields),
              });
              const msg = await set.json();
              if (!set.ok) {
                toast.error(msg.message);
                setLoading(false);
              } else {
                setFavourite(true);
                setLoading(false);
                window.location.reload();
                toast.success(msg.message);
              }
            }}
          >
            {loading ? <LoadingDots color="#FAFAFA" /> : <Star />}
          </button>
        )}
        {currUser && currUser.username !== user?.username && favourite && (
          <button
            onClick={async () => {
              setLoading(true);
              const fields = {
                postId: post.id,
              };
              const set = await fetch("/explore/stg/api/unfavourite", {
                method: "POST",
                body: JSON.stringify(fields),
              });
              const msg = await set.json();
              if (!set.ok) {
                toast.error(msg.message);
                setLoading(false);
              } else {
                setFavourite(false);
                setLoading(false);
                window.location.reload();
                toast.success(msg.message);
              }
            }}
          >
            {loading ? (
              <LoadingDots color="#FAFAFA" />
            ) : (
              <Star color="#ffff80" strokeWidth={3} />
            )}
          </button>
        )}
      </div>
      <div>
        {editActive ? (
          <>
            <div className="ml-14">
              <EditForm post={post} />
            </div>
            {/* <div className="mb-8 ml-14">hello</div> */}
          </>
        ) : (
          <>
            <div className="ml-14">
              <p className="text-4xl font-bold">{post?.title}</p>
            </div>
            <div className="mb-8 ml-14 mt-4 whitespace-pre-line">
              <p>{post?.body}</p>
            </div>
          </>
        )}
        <hr />
        <div className="mt-4">
          <p className="text-3xl font-bold">Comments:</p>
        </div>
      </div>
    </>
  );
};

export default PostPageBox;
