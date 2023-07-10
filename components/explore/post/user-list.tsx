import { GradiantCard } from "@/components/shared/gradiant-card";
import { fetcher } from "@/lib/fetcher-utils";
import useMutCom from "@/lib/state/useMutCom";
import { useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import Link from "next/link";
import { SafeUser } from "@/types";
import { AlertTriangle, User } from "lucide-react";
import Loading from "@/components/shared/loading";

interface UserListProps {
  filter: string;
}

const UserList: React.FC<UserListProps> = ({ filter }) => {
  const togMut = useMutCom();
  const { data: users, mutate } = useSWR(["/api/users", filter], fetcher);

  useEffect(() => {
    togMut.toogleMutate && mutate();
  }, [mutate, togMut]);

  if (users === "empty") {
    return (
      <div className="mt-4 flex h-screen flex-col items-center justify-center">
        <AlertTriangle className="mb-2 h-20 w-20" />
        <p className="text-md mb-[560px] text-center font-heading md:mb-96 md:ml-3 md:text-2xl">
          User not found
        </p>
      </div>
    );
  }

  if (users === "not searched") {
    return (
      <div className="mt-4 flex h-screen flex-col items-center justify-center">
        <User className="mb-2 h-20 w-20" />
        <p className="text-md mb-[560px] text-center font-heading md:mb-96 md:ml-3 md:text-2xl">
          Please insert username
        </p>
      </div>
    );
  }

  if (users === "invalid") {
    return (
      <div className="mt-4 flex h-screen flex-col items-center justify-center">
        <AlertTriangle className="mb-2 h-20 w-20" />
        <p className="text-md mb-[560px] text-center font-heading md:mb-96 md:ml-3 md:text-2xl">
          Invalid input
        </p>
      </div>
    );
  }

  if (users) {
    return (
      <div>
        <GradiantCard variant="clean" className="mb-8 mt-3">
          <ul className="mt-3 flex flex-col gap-5">
            {users?.map((user: SafeUser, index: number) => (
              <div
                key={user.id}
                className={`relative flex items-center justify-between gap-x-6 py-5 ${
                  index + 1 < users.length ? "pb-16" : "pb-12"
                }`}
              >
                <div className="flex flex-row items-center gap-3">
                  <Image
                    src={user.image || "/nana.jpg"}
                    alt={user.name as string}
                    width={48}
                    height={48}
                    className="h-24 w-24 rounded-full"
                  />
                  <div className="-space-y-1">
                    <Link
                      className="cursor-pointer text-2xl font-bold duration-300 hover:underline hover:decoration-white hover:underline-offset-2"
                      href={`/profile/${user.username}`}
                      target="_blank"
                    >
                      {user.username}
                    </Link>
                    <p className=" text-gray-500">{user.name}</p>
                  </div>
                </div>
                {index !== users.length - 1 && (
                  <div className="absolute inset-x-0 bottom-0 mx-[-23px] h-0.5 bg-navy-400/30"></div>
                )}
              </div>
            ))}
          </ul>
        </GradiantCard>
      </div>
    );
  }

  return (
    <div>
      <Loading />
    </div>
  );
};

export default UserList;
