import { LIST_SUBDOMAIN, ORIGIN_SUBDOMAIN } from "@/helpers/middleware";

export const transformSubdomain = (subdomain: string): string => {
  if (!LIST_SUBDOMAIN.includes(subdomain)) {
    return ORIGIN_SUBDOMAIN;
  }

  const originSubdomain = ORIGIN_SUBDOMAIN;
  return originSubdomain ? `${originSubdomain}-${subdomain}` : subdomain;
};
