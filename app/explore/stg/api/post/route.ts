import getCurrentUser from "@/lib/actions/getCurrentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  const {
    title,
    message,
    image,
    tags,
  }: { title: string; message: string; image: string; tags: string[] } =
    await req.json();

  const currentPost = await prisma.post.findFirst({
    where: {
      title: title,
      userId: currentUser?.id,
    },
  });

  if (currentPost) {
    return NextResponse.json(
      {
        message: "You have already have that title. Please use another title.",
      },
      {
        status: 400,
      }
    );
  }

  if (tags.indexOf("") !== -1) {
    return NextResponse.json(
      {
        message: "Invalid tag('') spotted",
      },
      {
        status: 400,
      }
    );
  }

  for (const x of tags as string[]) {
    if (x.length >= 20) {
      return NextResponse.json(
        {
          message: `Tag '${x}' exceeded word count`,
        },
        {
          status: 400,
        }
      );
    }
  }

  const set = await prisma.user.update({
    where: {
      email: currentUser?.email,
    },
    data: {
      posts: {
        create: {
          title: title,
          body: message,
          image: image,
          tags: tags,
        },
      },
    },
  });

  if (!set)
    return NextResponse.json(
      {
        message: "Error adding post. Please try again",
      },
      {
        status: 400,
      }
    );

  return NextResponse.json(
    {
      message: "Successful! Please wait for to be redirected",
    },
    {
      status: 200,
    }
  );
}
