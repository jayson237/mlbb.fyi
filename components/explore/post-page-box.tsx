"use client";

import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import Link from "next/link";

import { SafeUser } from "@/types";
import { Post, User } from "@prisma/client";

import { Edit3, Star, Trash2 } from "lucide-react";
import { GradiantCard } from "../shared/gradiant-card";
import DeletePost from "./del-post";
import EditForm from "./edit-form";
import LoadingDots from "../shared/icons/loading-dots";
import DialogFit from "../shared/dialog-fit";

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

  const [expanded, setExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);

  function isExpandable(): boolean | undefined {
    if (containerRef.current && paragraphRef.current) {
      const conth = containerRef.current.clientHeight;
      const parah = parseInt(getComputedStyle(paragraphRef.current).lineHeight);

      const lineCount = conth / parah;
      console.log(lineCount);
      if (lineCount > 3) return true;
      else false;
    }
  }

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const closeEdit = () => {
    setEditActive(false);
  };

  return (
    <GradiantCard className="mb-1.5 grow" variant="clean">
      {editActive ? (
        <EditForm post={post} onCancel={() => closeEdit()} />
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex flex-row items-start justify-between">
              <p className="font-heading text-3xl">{post?.title}</p>
              {currUser && currUser.username === user?.username && (
                <div className="mt-3 flex cursor-pointer flex-row">
                  <button onClick={() => setEditActive(!editActive)}>
                    {editActive ? (
                      <Edit3 strokeWidth={2} className="mr-5 h-5 w-5" />
                    ) : (
                      <Edit3 className="mr-5 h-5 w-5 ease-in-out hover:text-navy-400 hover:duration-300" />
                    )}
                  </button>
                  <DialogFit
                    title="Delete Post"
                    triggerChild={
                      <Trash2 className="h-5 w-5 ease-in-out hover:text-red-400 hover:duration-300" />
                    }
                  >
                    <DeletePost postId={post.id} />
                  </DialogFit>
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
                    {loading ? (
                      <LoadingDots color="#FAFAFA" />
                    ) : (
                      <Star className="transition-all duration-300 ease-in-out hover:text-yellow-300" />
                    )}
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
                      <Star color="#FACC18" strokeWidth={2} />
                    )}
                  </button>
                )}
            </div>
            <div className="flex flex-row items-center font-medium text-gray-500">
              <p className="mr-1">by</p>
              <Link href={`/profile/${post.createdBy}/statistics`}>
                <p className="text-navy-300 hover:underline">
                  {post?.createdBy}
                </p>
              </Link>
            </div>
          </div>

          <div className="mb-8 mt-4 flex flex-col" ref={containerRef}>
            <p
              className={`${expanded ? "" : "line-clamp-3"}`}
              ref={paragraphRef}
            >
              {post.body}
            </p>
            <span>
              {isExpandable() && (
                <button
                  onClick={toggleExpand}
                  className="font-bold text-navy-300 transition-all ease-in-out hover:underline hover:duration-300"
                >
                  {!expanded ? "See more" : "See less"}
                </button>
              )}
            </span>
          </div>
        </>
      )}
    </GradiantCard>
  );
};

export default PostPageBox;
