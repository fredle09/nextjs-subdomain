import ms from "ms";
import {
  parseAsString,
  parseAsInteger,
  parseAsStringLiteral,
} from "nuqs/server";

import { BlogRequest } from "@/lib/blog/request";
import { IGetFilteredBlogsProps } from "@/lib/blog/service";

import blogQueryKeys from "./query-keys";

import type { IBlogVM } from "@/types/blog";
import type { UseSuspenseQueryOptions } from "@tanstack/react-query";

export function getBlogSearchParams() {
  return {
    search: parseAsString.withDefault(""),
    sortBy: parseAsStringLiteral(["date", "title", "author"]).withDefault(
      "date"
    ),
    sortOrder: parseAsStringLiteral(["asc", "desc"]).withDefault("desc"),
    page: parseAsInteger.withDefault(1),
    limit: parseAsInteger.withDefault(10),
  };
}

export function getFilteredBlogsOptions(
  params: IGetFilteredBlogsProps
): UseSuspenseQueryOptions<
  { blogs: IBlogVM[]; total: number },
  unknown,
  IBlogVM[]
> {
  return {
    queryKey: blogQueryKeys.blogsWithFilterPagination(params),
    queryFn: () => BlogRequest.getFilteredBlogs(params),
    select: (data) => data.blogs,
    staleTime: ms("5m"),
  };
}
