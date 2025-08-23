import { ORIGIN_SUBDOMAIN } from '@/helpers/middleware';

export const transformSubdomain = (subdomain: string): string => {
  const originSubdomain = ORIGIN_SUBDOMAIN;
  return originSubdomain ? `${originSubdomain}-${subdomain}` : subdomain;
};
