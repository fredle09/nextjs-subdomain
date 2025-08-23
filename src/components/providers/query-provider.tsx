"use client";

import { toast } from "sonner";
import { useState } from "react";
import dynamic from "next/dynamic";
import {
  isServer,
  QueryCache,
  QueryClient,
  MutationCache,
  QueryClientProvider,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

import { formatErrorMessage } from "@/helpers/format";

import Show from "../show";

const ReactQueryDevtools = dynamic(
  () =>
    import("@tanstack/react-query-devtools").then((mod) => ({
      default: mod.ReactQueryDevtools,
    })),
  { ssr: false }
);

function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // Performance optimizations
        staleTime: 1000 * 60 * 5, // 5 minutes
        gcTime: 1000 * 60 * 10, // 10 minutes (garbage collection time)
        refetchOnWindowFocus: false,
        refetchOnReconnect: "always",
        // Smart retry logic
        retry: (failureCount, error) => {
          // Don't retry on 4xx errors (client errors)
          const httpError = error as {
            status?: number;
            response?: { status?: number };
          };
          const status = httpError?.status || httpError?.response?.status;
          if (status && status >= 400 && status < 500) return false;

          // Retry up to 3 times for other errors
          return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
        // Global mutation settings
        retry: 1,
        retryDelay: 1000,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) => {
          return (
            defaultShouldDehydrateQuery(query) ||
            query.state.status === "pending"
          );
        },
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => {
        // Only show error toast if query doesn't have error boundary
        if (!query.meta?.silent) {
          const { title, description } = formatErrorMessage(error);
          toast.error(title, { description });
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        // Skip toast if manual error handling is specified
        if (!mutation.options?.meta?.silent) {
          const { title, description } = formatErrorMessage(error);
          toast.error(title, { description });
        }
      },
      onSuccess: (_data, _variables, _context, mutation) => {
        // Show success toast if specified
        const successMessage = mutation.options?.meta?.successMessage as string;
        if (successMessage) {
          toast.success(successMessage);
        }
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    return createQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = createQueryClient();
    }
    return browserQueryClient;
  }
}

type TQueryProviderProps = React.PropsWithChildren;

export function QueryProvider({ children }: TQueryProviderProps) {
  const [queryClient] = useState(() => getQueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Show when={process.env.NODE_ENV === "development"}>
        <ReactQueryDevtools initialIsOpen={false} />
      </Show>
    </QueryClientProvider>
  );
}
