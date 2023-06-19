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
import { GradiantCard } from "../shared/gradiant-card";

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
    <GradiantCard className="mb-4 grow" variant="clean">
      {editActive ? (
        <EditForm post={post} />
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex flex-row items-center justify-between">
              <p className="font-heading text-3xl">{post?.title}</p>
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
              {currUser &&
                currUser.username !== user?.username &&
                !favourite && (
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
              {currUser &&
                currUser.username !== user?.username &&
                favourite && (
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
            <div className="flex flex-row items-center font-medium text-gray-500">
              <p className="mr-1">by</p>
              <Link href={`/profile/${post.createdBy}/statistics`}>
                <p className="text-navy-300"> {post?.createdBy}</p>
              </Link>
            </div>
          </div>
          <div className="mb-8 mt-4 line-clamp-5">
            <p>{post?.body}</p>
          </div>
        </>
      )}
    </GradiantCard>
  );
};

export default PostPageBox;
