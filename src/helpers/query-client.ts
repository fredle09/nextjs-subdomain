import ms from "ms";
import { toast } from "sonner";
import {
  isServer,
  QueryCache,
  QueryClient,
  MutationCache,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";

import { formatErrorMessage } from "./format";

export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: ms("5m"),
        gcTime: ms("10m"),
        refetchOnWindowFocus: false,
        refetchOnReconnect: "always",
        retry: (failureCount, error) => {
          const httpError = error as {
            status?: number;
            response?: { status?: number };
          };
          const status = httpError?.status || httpError?.response?.status;
          if (status && status >= 400 && status < 500) return false;

          return failureCount < 3;
        },
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      },
      mutations: {
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
        if (!query.meta?.silent) {
          const { title, description } = formatErrorMessage(error);
          toast.error(title, { description });
        }
      },
    }),
    mutationCache: new MutationCache({
      onError: (error, _variables, _context, mutation) => {
        if (!mutation.options?.meta?.silent) {
          const { title, description } = formatErrorMessage(error);
          toast.error(title, { description });
        }
      },
      onSuccess: (_data, _variables, _context, mutation) => {
        const successMessage = mutation.options?.meta?.successMessage as string;
        if (successMessage) {
          toast.success(successMessage);
        }
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
  if (isServer) {
    return createQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = createQueryClient();
    }
    return browserQueryClient;
  }
}
