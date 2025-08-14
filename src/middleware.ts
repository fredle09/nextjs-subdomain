import { NextResponse } from "next/server";

import {
  getSubdomain,
  getRedirectUrl,
  checkRedirectSubdomain,
  ORIGIN_PATHNAME_MAPPING,
} from "./helpers/middleware";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { nextUrl, headers } = req;
  const url = nextUrl.clone();
  const { pathname, protocol } = url;
  const host = headers.get("host") || null;
  const subdomain = getSubdomain(host);

  if (!subdomain || ["staging"].includes(subdomain)) {
    const redirectSubdomain = checkRedirectSubdomain(pathname);
    if (redirectSubdomain) {
      const newPathname = pathname.replace(redirectSubdomain, "");
      const newSubdomain = !subdomain
        ? redirectSubdomain
        : `${subdomain}-${redirectSubdomain}`;

      const url = getRedirectUrl(newPathname, protocol, newSubdomain);
      return NextResponse.redirect(url);
    }
  }

  if (subdomain && !["staging"].includes(subdomain)) {
    const redirectSubdomain = ORIGIN_PATHNAME_MAPPING[subdomain];
    // TODO: Need to handle the case sub-pathname is provided not only the root path
    if (pathname === "/") {
      url.pathname = `/${redirectSubdomain}`;
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
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    "/((?!api|_next|[\\w-]+\\.\\w+).*)",
  ],
};
