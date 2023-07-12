"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@prisma/client";
import { GradiantCard } from "../shared/gradiant-card";
import { RotateCcw } from "lucide-react";
import LoadingDots from "../shared/icons/loading-dots";

interface RandomUserProps {
  randomUsers: User[];
}

const RandomUser: React.FC<RandomUserProps> = ({ randomUsers }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newRandomUsers, setRandomUsers] = useState(randomUsers);
  return (
    <GradiantCard
      className="sticky top-14 hidden h-full max-h-[90vh] rounded-3xl md:block"
      variant="clean"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold tracking-wide">
          Connect with others
        </h2>
        <button>
          {loading ? (
            <>
              <LoadingDots color="#FAFAFA" />
            </>
          ) : (
            <RotateCcw
              className="transition-all ease-in-out hover:text-navy-200 hover:duration-300 "
              onClick={async (e) => {
                e.preventDefault();
                setLoading(true);
                const set = await fetch("/explore/stg/api/getRandomUser", {
                  method: "GET",
                });
                const newRandomUsers = await set.json();
                if (!set.ok) {
                  setLoading(false);
                } else {
                  setLoading(false);
                  console.log(newRandomUsers);
                  setRandomUsers(newRandomUsers.users);
                }
              }}
            />
          )}
        </button>
      </div>
      <ul className="mt-3 flex flex-col gap-3">
        {newRandomUsers.length !== 0 ? (
          newRandomUsers.map((user) => (
            <li key={user.id} className="flex gap-3">
              <Image
                src={user.image || "/nana.jpg"}
                alt={user.name as string}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div className="-space-y-1">
                <Link
                  className="cursor-pointer duration-300 hover:underline hover:decoration-white hover:underline-offset-2"
                  href={`/profile/${user.username}`}
                  target="_blank"
                >
                  {user.username}
                </Link>
                <p className="text-gray-500">{user.name}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="font-sat">Please refresh to get users</p>
        )}
      </ul>
    </GradiantCard>
  );
};

export default RandomUser;
