"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "@/helpers/query-client";

import Show from "../show";

type TQueryProviderProps = React.PropsWithChildren;

export function QueryProvider({ children }: TQueryProviderProps) {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Show when={process.env.NODE_ENV === "development"}>
        <ReactQueryDevtools initialIsOpen={false} />
      </Show>
    </QueryClientProvider>
  );
}
