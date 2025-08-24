const blogQueryKeys = {
  all: ["queries"] as const,
  blogs: () => [...blogQueryKeys.all, "blogs"] as const,
  blog: (id: string) => [...blogQueryKeys.blogs(), id] as const,
  blogsWithFilterPagination: (filters: unknown) =>
    [...blogQueryKeys.blogs(), filters] as const,
} as const;

export default blogQueryKeys;
