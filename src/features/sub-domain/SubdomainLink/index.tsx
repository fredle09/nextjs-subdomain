"use client";

import Link from "next/link";
import { format } from "url";

import useSubdomain from "@/hooks/sub-domain/useSubdomain";
import { getRedirectUrl, ORIGIN_SUBDOMAIN } from "@/helpers/middleware";

export interface ISubdomainLinkProps extends React.ComponentProps<typeof Link> {
  subdomain?: string;
}

export default function SubdomainLink({
  href: hrefProps,
  subdomain: subdomainProps = ORIGIN_SUBDOMAIN,
  ...props
}: ISubdomainLinkProps) {
  const { subdomain } = useSubdomain();
  if (subdomain === subdomainProps) {
    return <Link href={hrefProps} {...props} />;
  }

  const hrefString =
    typeof hrefProps === "string" ? hrefProps : format(hrefProps);
  const newHost = getRedirectUrl({
    pathname: hrefString,
    subdomain: subdomainProps,
  });
  const href = new URL(hrefString, newHost);
  return <Link href={href} {...props} prefetch={false} />;
}
