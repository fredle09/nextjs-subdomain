import { rootDomain } from "@/lib/utils";

export const LIST_SUBDOMAIN = ["affiliate"] as const;
export const LIST_ORIGIN_SUBDOMAIN = ["", "staging"];
export const ORIGIN_PATHNAME_MAPPING = LIST_ORIGIN_SUBDOMAIN.reduce<
  Record<string, string>
>((acc, origin) => {
  const subPaths = LIST_SUBDOMAIN.reduce<Record<string, string>>(
    (acc, subdomain) => {
      if (!origin) {
        return { ...acc, [subdomain]: subdomain };
      }

      return {
        ...acc,
        [`${origin}-${subdomain}`]: subdomain,
      };
    },
    {}
  );
  return { ...acc, ...subPaths };
}, {});
const LIST_PATHNAME = [...new Set(Object.values(ORIGIN_PATHNAME_MAPPING))];

export function getSubdomain(host?: string | null): string {
  if (!host && typeof window !== "undefined") {
    host = window.location.host;
  }

  if (host && host.includes(".")) {
    const candidate = host.split(".")[0];
    if (candidate && !candidate.includes("localhost")) {
      return candidate;
    }
  }
  return "";
}

export function getRedirectUrl(
  pathname: string,
  protocol: string,
  subdomain: string
) {
  const host = `${protocol}//${subdomain}.${rootDomain}`;
  return new URL(pathname, host);
}

export function checkRedirectSubdomain(pathname: string) {
  return LIST_PATHNAME.find(
    (path) => pathname === `/${path}` || pathname.startsWith(`/${path}/`)
  );
}

export function getNewSubdomain(subdomain: string, redirectSubdomain: string) {
  return !subdomain ? redirectSubdomain : `${subdomain}-${redirectSubdomain}`;
}
