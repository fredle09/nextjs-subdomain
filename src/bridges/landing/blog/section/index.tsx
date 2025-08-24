import ms from "ms";
import { Suspense } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import { BlogService } from "@/lib/blog/service";
import blogQueryKeys from "@/features/blog/query-keys";
import { getQueryClient } from "@/helpers/query-client";
import BlogSection from "@/features/landing/blog-section";
import BlogListLoading from "@/features/blog/list/loading";
import BlogErrorBoundary from "@/features/blog/list/error";

import BridgeBlogList from "../list";

export default async function BridgeBlogSection() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: blogQueryKeys.blogsWithFilterPagination({}),
    queryFn: () => BlogService.getFilteredBlogs({}),
    staleTime: ms("5m"),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <BlogSection>
        <BlogErrorBoundary>
          <Suspense fallback={<BlogListLoading />}>
            <BridgeBlogList />
          </Suspense>
        </BlogErrorBoundary>
      </BlogSection>
    </HydrationBoundary>
  );
}
