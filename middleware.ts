import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (
    !token &&
    (request.nextUrl.pathname.startsWith("/createBlog") ||
      request.nextUrl.pathname.startsWith("/myBlogs") ||
      request.nextUrl.pathname.startsWith("/editBlog"))
  ) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
