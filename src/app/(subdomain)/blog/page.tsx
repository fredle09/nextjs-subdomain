import ms from "ms";
import { createLoader } from "nuqs/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import Blog from "@/features/blog";
import { queryKeys } from "@/types/query";
import { BlogService } from "@/lib/blog/service";
import { getQueryClient } from "@/helpers/query-client";
import { getBlogSearchParams } from "@/features/blog/utils";

import type { SearchParams } from "nuqs/server";

interface BlogPageProps {
  searchParams: Promise<SearchParams>;
}

export const revalidate = 60; // 1 minute

export const dynamic = "force-static";

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
          <Blog />
          {/* TODO: Uncomment when implement create new post */}
          {/* <div className="mt-16 text-center">
            <div className="flex gap-4 items-center justify-center flex-wrap">
              <Button asChild size="lg">
                <Link href="/create">Create New Post</Link>
              </Button>
            </div>
          </div> */}
        </div>
      </div>
    </HydrationBoundary>
  );
}
