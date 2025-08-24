export interface QueryMeta extends Record<string, unknown> {
  /** Disable automatic error toasts */
  silent?: boolean;
  /** Use error boundary instead of toast */
  errorBoundary?: boolean;
}

export interface MutationMeta extends QueryMeta {
  /** Show success toast with this message */
  successMessage?: string;
  /** Skip automatic error handling */
  manual?: boolean;
}

export const queryKeys = {
  all: ["queries"] as const,
  blogs: () => [...queryKeys.all, "blogs"] as const,
  blog: (id: string) => [...queryKeys.blogs(), id] as const,
  blogsWithFilterPagination: (filters: unknown) =>
    [...queryKeys.blogs(), filters] as const,
} as const;
