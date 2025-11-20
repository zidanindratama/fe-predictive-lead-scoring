import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const protectedRoutes: Record<string, string[]> = {
  "/dashboard/users": ["ADMIN"],
  "/dashboard/campaigns": ["ADMIN", "STAFF"],
  "/dashboard": ["ADMIN", "STAFF", "USER"],
};

const authRoutes = ["/auth/sign-in", "/auth/sign-up"];

interface JwtPayload {
  sub: string;
  email: string;
  role: "ADMIN" | "STAFF" | "USER";
  exp: number;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.cookies.get("accessToken")?.value;

  if (authRoutes.some((route) => pathname.startsWith(route))) {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      const signInUrl = new URL("/auth/sign-in", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const userRole = decoded.role;

      const matchedPath = Object.keys(protectedRoutes)
        .filter((route) => pathname.startsWith(route))
        .sort((a, b) => b.length - a.length)[0];

      if (matchedPath) {
        const allowedRoles = protectedRoutes[matchedPath];

        if (!allowedRoles.includes(userRole)) {
          return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
      }
    } catch (error) {
      return NextResponse.redirect(new URL("/auth/sign-in", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
