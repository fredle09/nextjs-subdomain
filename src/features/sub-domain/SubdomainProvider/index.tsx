'use client';

import { createContext } from 'react';

import { transformSubdomain } from './utils';

export interface ISubdomainContextProps {
  subdomain: string;
}

export const SubdomainContext = createContext<ISubdomainContextProps | undefined>(undefined);

interface ISubdomainProviderProps extends React.PropsWithChildren, ISubdomainContextProps {}

export const SubdomainProvider = ({ children, subdomain: subdomainProps }: ISubdomainProviderProps) => {
  const subdomain = transformSubdomain(subdomainProps);
  return <SubdomainContext.Provider value={{ subdomain }}>{children}</SubdomainContext.Provider>;
};
