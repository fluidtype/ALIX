import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": "Basic realm=\"ALIX Admin\"" },
  });
}

export function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith("/admin/airdrop")) {
    return NextResponse.next();
  }

  const user = process.env.ADMIN_USERNAME ?? "admin";
  const password = process.env.ADMIN_PASSWORD ?? "admin";
  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return unauthorized();
  }

  const base64Credentials = authorization.split(" ")[1] ?? "";
  let decoded = "";
  try {
    decoded = atob(base64Credentials);
  } catch {
    return unauthorized();
  }
  const [providedUser, providedPassword] = decoded.split(":");

  if (providedUser !== user || providedPassword !== password) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/airdrop/:path*"],
};
