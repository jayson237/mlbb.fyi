import { Comment, Post, Reply, User } from "@prisma/client";

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified?: string;
};

export interface IFullComment extends Comment {
  replies: Reply[];
}

export interface IFullPost extends Post {
  comments: IFullComment[];
}
