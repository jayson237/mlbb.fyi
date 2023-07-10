import prisma from "@/lib/prismadb";

export default async function getCurrentPost(postId: string) {
  try {
    const post = await prisma?.post.findFirst({
      where: {
        id: postId,
      },
    });
    return post;
  } catch (error) {
    return null;
  }
}
