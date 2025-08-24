const queryKeys = {
  all: ["queries"] as const,
  blogs: () => [...queryKeys.all, "blogs"] as const,
  blog: (id: string) => [...queryKeys.blogs(), id] as const,
  blogsWithFilterPagination: (filters: unknown) =>
    [...queryKeys.blogs(), filters] as const,
} as const;

export default queryKeys;
