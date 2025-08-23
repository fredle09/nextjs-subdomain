import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import {
  getRedirectUrl,
  ORIGIN_SUBDOMAIN,
  REVERSE_ORIGIN_PATHNAME_MAPPING,
} from "@/helpers/middleware";

import useSubdomain from "./useSubdomain";

import type {
  NavigateOptions,
  PrefetchOptions,
} from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface ISubdomainRouterOptions {
  navigationOn?: "root" | "subdomain";
}

export default function useSubdomainRouter({
  navigationOn = "subdomain",
}: ISubdomainRouterOptions = {}): ReturnType<typeof useRouter> {
  const router = useRouter();
  const { subdomain } = useSubdomain();

  const shouldUseSubdomainRouting = useMemo(() => {
    return ORIGIN_SUBDOMAIN === subdomain || navigationOn === "root";
  }, [subdomain, navigationOn]);

  const originDomain = useMemo(() => {
    return (
      REVERSE_ORIGIN_PATHNAME_MAPPING[subdomain] ||
      process.env.NEXT_PUBLIC_DEFAULT_ORIGIN ||
      ""
    );
  }, [subdomain]);

  const buildSubdomainUrl = useCallback(
    (hrefString: string): string => {
      const redirectUrl = getRedirectUrl({
        pathname: hrefString,
        subdomain: originDomain,
      });
      return new URL(hrefString, redirectUrl).toString();
    },
    [originDomain]
  );

  const enhancedRouter = useMemo(
    () => ({
      ...router,
      push: (hrefString: string, options?: NavigateOptions) => {
        const fullUrl = buildSubdomainUrl(hrefString);
        return router.push(fullUrl, options);
      },
      replace: (hrefString: string, options?: NavigateOptions) => {
        const fullUrl = buildSubdomainUrl(hrefString);
        return router.replace(fullUrl, options);
      },
      prefetch: (hrefString: string, options?: PrefetchOptions) => {
        const fullUrl = buildSubdomainUrl(hrefString);
        return router.prefetch(fullUrl, options);
      },
    }),
    [router, buildSubdomainUrl]
  );

  return shouldUseSubdomainRouting ? enhancedRouter : router;
}
