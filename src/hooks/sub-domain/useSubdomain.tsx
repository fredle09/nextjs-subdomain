import { useContext } from "react";

import { SubdomainContext } from "@/features/sub-domain/SubdomainProvider";

import type { ISubdomainContextProps } from "@/features/sub-domain/SubdomainProvider";

type TSubdomainContext = ISubdomainContextProps;

const DEFAULT_SUBDOMAIN_CONTEXT = {
  subdomain: process.env.NEXT_PUBLIC_DEFAULT_SUBDOMAIN || "",
} satisfies TSubdomainContext;

export default function useSubdomain(): TSubdomainContext {
  const context = useContext(SubdomainContext) as TSubdomainContext | undefined;

  return context ?? DEFAULT_SUBDOMAIN_CONTEXT;
}
