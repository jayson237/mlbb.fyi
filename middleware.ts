export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.split("/")[1] === "profile" && path.split("/")[2] === "settings") {
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    const get = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/profile/settings/api/bind?email=${token?.email}`,
      {
        method: "GET",
      }
    );
    const data: {
      email: string;
      id: string;
      image?: string;
      username?: string;
      accId?: string;
    } = await get.json();

    if (data.accId)
      return NextResponse.redirect(new URL("/profile/settings", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/settings/bind"],
};
