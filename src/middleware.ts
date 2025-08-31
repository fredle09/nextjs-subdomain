import { NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import {
  getSubdomain,
  getRedirectUrl,
  getNewSubdomain,
  ORIGIN_SUBDOMAIN,
  checkRedirectSubdomain,
  ORIGIN_PATHNAME_MAPPING,
} from "./helpers/middleware";

import type { NextRequest } from "next/server";

const PRIVATE_ROUTERS_FOR_ADMIN = ["/admin"];

export async function middleware(req: NextRequest) {
  const { nextUrl, headers } = req;
  const url = nextUrl.clone();
  const { pathname, protocol } = url;
  const host = headers.get("host") || null;
  const subdomain = getSubdomain(host);
  const session = getSessionCookie(req);

  // TODO: Implement role-based access control
  if (
    PRIVATE_ROUTERS_FOR_ADMIN.some(
      (privatePathname) =>
        privatePathname === pathname ||
        privatePathname.startsWith(`${pathname}/`)
    ) &&
    subdomain === ORIGIN_SUBDOMAIN &&
    !session
  ) {
    const url = new URL("/admin/login", req.url);
    return NextResponse.redirect(url);
  }

  if (subdomain === ORIGIN_SUBDOMAIN) {
    const redirectSubdomain = checkRedirectSubdomain(pathname);
    if (redirectSubdomain) {
      const newPathname = pathname.replace(`/${redirectSubdomain}`, "");
      const newSubdomain = getNewSubdomain(subdomain, redirectSubdomain);

      const url = getRedirectUrl({
        pathname: newPathname,
        protocol,
        subdomain: newSubdomain,
      });
      return NextResponse.redirect(url);
    }
  } else {
    const redirectSubdomain = ORIGIN_PATHNAME_MAPPING[subdomain];
    if (redirectSubdomain) {
      url.pathname = `/${redirectSubdomain}${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // On the root domain, allow normal access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico, /images/logo.png, etc.)
     */
    "/((?!_next|api)(?!.*\\.[^/]+$).*)",
  ],
};
