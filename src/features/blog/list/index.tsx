"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import Show from "@/components/show";
import Mapping from "@/components/mapping";
import { BlogItem } from "@/features/blog/item";

import { useFilterHooks } from "./hooks";
import { getFilteredBlogsOptions } from "../utils";

import type { IBlogsParams } from "@/types/blog-params";
import BlogListNotFound from "./not-found";

export function BlogList() {
  const {
    page,
    limit,
    sortBy,
    sortOrder,
    searchDebounced: search,
  } = useFilterHooks();

  const currentParams: IBlogsParams = {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
  };

  const { data: blogs } = useSuspenseQuery(
    getFilteredBlogsOptions(currentParams)
  );

  return (
    <Show
      when={blogs.length > 0}
      fallback={<BlogListNotFound search={search} />}
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Mapping
          data={blogs}
          as={BlogItem}
          keyProps="id"
          transform={(blog) => ({ blog })}
        />
      </div>

      <div className="mt-8 text-center">
        <p className="text-muted-foreground text-sm">
          Showing {blogs.length} posts
          {search && ` matching "${search}"`}
        </p>
      </div>
    </Show>
  );
}
