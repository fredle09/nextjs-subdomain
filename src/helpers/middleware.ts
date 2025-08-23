export const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
export const SET_COMPOUND_TLD = new Set(
  process.env.NEXT_PUBLIC_LIST_COMPOUND_TLD?.split(",") || ["com.vn"]
);
export const LIST_SUBDOMAIN =
  process.env.NEXT_PUBLIC_LIST_SUBDOMAIN?.split(",") || [];
export const ORIGIN_SUBDOMAIN = process.env.NEXT_PUBLIC_DEFAULT_SUBDOMAIN || "";
export const ORIGIN_PATHNAME_MAPPING = LIST_SUBDOMAIN.reduce<
  Record<string, string>
>((acc, subdomain) => {
  const origin = ORIGIN_SUBDOMAIN ? `${ORIGIN_SUBDOMAIN}-` : "";
  return {
    ...acc,
    [`${origin}${subdomain}`]: subdomain,
  };
}, {});
export const REVERSE_ORIGIN_PATHNAME_MAPPING = LIST_SUBDOMAIN.reduce<
  Record<string, string>
>(
  (acc, subdomain) => {
    const origin = ORIGIN_SUBDOMAIN ? `${ORIGIN_SUBDOMAIN}-` : "";
    return {
      ...acc,
      [`${origin}${subdomain}`]: ORIGIN_SUBDOMAIN,
    };
  },
  { [ORIGIN_SUBDOMAIN]: ORIGIN_SUBDOMAIN }
);

export function getSubdomain(host?: string | null): string {
  const resolvedHost =
    host || (typeof window !== "undefined" ? window.location.host : "");
  if (!resolvedHost) {
    return "";
  }

  const hostParts = resolvedHost
    .split(/[.:]/)
    .filter((part) => part.length > 0);
  if (hostParts.length < 2) {
    return "";
  }

  const lastTwoParts = hostParts.slice(-2).join(".");
  const hasCompoundTLD =
    hostParts.length >= 3 && SET_COMPOUND_TLD.has(lastTwoParts);
  const requiredDomainParts = hasCompoundTLD ? 3 : 2;
  if (hostParts.length <= requiredDomainParts) {
    return "";
  }

  const subdomainParts = hostParts.slice(0, -requiredDomainParts);
  return subdomainParts.join(".");
}

interface IGetRedirectUrlProps {
  pathname: string;
  protocol?: string;
  subdomain: string;
}

export function getRedirectUrl({
  pathname,
  protocol = process.env.NEXT_PUBLIC_DEFAULT_PROTOCOL || "https:",
  subdomain,
}: IGetRedirectUrlProps) {
  const host = `${protocol}//${subdomain ? `${subdomain}.` : ""}${ROOT_DOMAIN}`;
  return new URL(pathname, host);
}

const LIST_PATHNAME = [...new Set(Object.values(ORIGIN_PATHNAME_MAPPING))];

export function checkRedirectSubdomain(pathname: string) {
  return LIST_PATHNAME.find(
    (path) => pathname === `/${path}` || pathname.startsWith(`/${path}/`)
  );
}

export function getNewSubdomain(subdomain: string, redirectSubdomain: string) {
  return !subdomain ? redirectSubdomain : `${subdomain}-${redirectSubdomain}`;
}
