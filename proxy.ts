import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtDecode } from "jwt-decode";

const routeRules = [
  {
    pattern: /^\/dashboard\/users/,
    roles: ["ADMIN"],
  },
  {
    pattern: /^\/dashboard\/campaigns/,
    roles: ["ADMIN", "STAFF"],
  },
  {
    pattern: /^\/dashboard\/customers\/(create|import|[^/]+\/update)/,
    roles: ["ADMIN", "STAFF"],
  },
  {
    pattern: /^\/dashboard\/predictions\/(create|[^/]+\/update)/,
    roles: ["ADMIN", "STAFF"],
  },
  {
    pattern: /^\/dashboard/,
    roles: ["ADMIN", "STAFF", "USER"],
  },
];

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
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        const response = NextResponse.redirect(
          new URL("/auth/sign-in", request.url)
        );
        response.cookies.delete("accessToken");
        return response;
      }

      const matchedRule = routeRules.find((rule) =>
        rule.pattern.test(pathname)
      );

      if (matchedRule) {
        if (!matchedRule.roles.includes(userRole)) {
          return NextResponse.redirect(new URL("/unauthorized", request.url));
        }
      }
    } catch (error) {
      const response = NextResponse.redirect(
        new URL("/auth/sign-in", request.url)
      );
      response.cookies.delete("accessToken");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
