import ms from "ms";
import Link from "next/link";
import { Suspense } from "react";
import { createLoader } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { queryKeys } from "@/types/query";
import { Button } from "@/components/ui/button";
import { BlogList } from "@/features/blog/list";
import { BlogService } from "@/lib/blog/service";
import { BlogHeader } from "@/features/blog/header";
import { BlogListLoading } from "@/features/blog/loading";
import { getQueryClient } from "@/helpers/query-client";
import { getBlogSearchParams } from "@/features/blog/utils";
import { BlogErrorBoundary } from "@/features/blog/error-boundary";

import type { SearchParams } from "nuqs/server";

interface BlogPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const queryClient = getQueryClient();
  const blogParams = await createLoader(getBlogSearchParams())(searchParams);

  await queryClient.prefetchQuery({
    queryKey: queryKeys.blogsWithFilterPagination(blogParams),
    queryFn: () => BlogService.getFilteredBlogs(blogParams),
    staleTime: ms("5m"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight mb-4">Blog</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Welcome to our blog. Discover stories, insights, and ideas from
              our community.
            </p>
          </div>
          <BlogHeader />
          <BlogErrorBoundary>
            <Suspense fallback={<BlogListLoading />}>
              <BlogList />
            </Suspense>
          </BlogErrorBoundary>
          <div className="mt-16 text-center">
            <div className="flex gap-4 items-center justify-center flex-wrap">
              <Button asChild size="lg">
                <Link href="/blog/create">Create New Post</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/sub">Go to Sub Page</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
