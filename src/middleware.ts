// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isPublicRoute, Route } from "./config";
import { TOKEN_KEY } from "./store";
import { authApi } from "./api";

export const config = {
  matcher: ["/login", "/signup", "/", "/actions", "/friends"],
};

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = isPublicRoute(pathname);
  // console.log("path: ", pathname);

  if (isPublic) {
    // console.log("isPublic");
    return NextResponse.next();
  }

  const token = request.cookies.get(TOKEN_KEY)?.value;
  // console.log(token);

  if (!token) {
    return NextResponse.redirect(new URL(Route.Login, request.url));
  }

  console.log("check token");
  const isTokenValid = await authApi.checkToken(token ?? "");
  // console.log("isTokenValid", isTokenValid);

  if (!isTokenValid) {
    return NextResponse.redirect(new URL(Route.Login, request.url));
  }

  return NextResponse.next();
}
