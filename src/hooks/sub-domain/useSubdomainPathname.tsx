import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

import { ORIGIN_PATHNAME_MAPPING, ORIGIN_SUBDOMAIN } from '@/helpers/middleware';

import useSubdomain from './useSubdomain';

export default function useSubdomainPathname({
  navigationOn = 'subdomain',
}: { navigationOn?: 'root' | 'subdomain' } = {}): string {
  const pathname = usePathname();
  const { subdomain } = useSubdomain();

  const shouldUseSubdomainRouting = useMemo(() => {
    return ORIGIN_SUBDOMAIN === subdomain || navigationOn === 'root';
  }, [subdomain, navigationOn]);

  const originDomain = useMemo(() => {
    return ORIGIN_PATHNAME_MAPPING[subdomain] || process.env.NEXT_PUBLIC_DEFAULT_ORIGIN || '';
  }, [subdomain]);

  return shouldUseSubdomainRouting ? `${originDomain ? `/${originDomain}` : ''}${pathname}` : pathname;
}
