"use client";

import Link from "next/link";

import Show from "@/components/show";
import Mapping from "@/components/mapping";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/features/blog/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import { useFilterHooks } from "./hooks";
import { getFilteredBlogsOptions } from "../utils";

import type { IBlogsParams } from "@/types/blog-params";

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
      fallback={
        <Card className="max-w-md mx-auto">
          <CardHeader className="text-center">
            <h2 className="text-2xl font-semibold mb-2">
              {search ? "No posts found" : "No blog posts yet"}
            </h2>
            <p className="text-muted-foreground">
              {search
                ? `No posts match "${search}". Try a different search term.`
                : "Check back later for new content, or create your first blog post."}
            </p>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/create">Create First Post</Link>
            </Button>
          </CardFooter>
        </Card>
      }
    >
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Mapping
          data={blogs}
          as={BlogCard}
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
