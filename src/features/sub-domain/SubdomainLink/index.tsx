"use client";

import Link from "next/link";
import { format } from "url";

import useSubdomain from "@/hooks/sub-domain/useSubdomain";
import {
  getRedirectUrl,
  ORIGIN_SUBDOMAIN,
  REVERSE_ORIGIN_PATHNAME_MAPPING,
} from "@/helpers/middleware";

export interface ISubdomainLinkProps extends React.ComponentProps<typeof Link> {
  navigationOn?: "root" | "subdomain";
}

export default function SubdomainLink({
  href: hrefProps,
  navigationOn = "subdomain",
  ...props
}: ISubdomainLinkProps) {
  const { subdomain } = useSubdomain();
  if (subdomain !== ORIGIN_SUBDOMAIN && navigationOn !== "root") {
    return <Link href={hrefProps} {...props} />;
  }

  const originDomain =
    REVERSE_ORIGIN_PATHNAME_MAPPING[subdomain] ||
    process.env.NEXT_PUBLIC_DEFAULT_ORIGIN ||
    "";
  const hrefString =
    typeof hrefProps === "string" ? hrefProps : format(hrefProps);
  const newHost = getRedirectUrl({
    pathname: hrefString,
    subdomain: originDomain,
  });
  const href = new URL(hrefString, newHost);
  return <Link href={href} {...props} prefetch={false} />;
}
