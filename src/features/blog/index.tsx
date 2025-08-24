import { Suspense } from "react";

import { BlogList } from "./list";
import { BlogHeader } from "./header";
import BlogErrorBoundary from "./list/error";
import BlogListLoading from "./list/loading";

export default function Blog() {
  return (
    <>
      <BlogHeader />
      <BlogErrorBoundary>
        <Suspense fallback={<BlogListLoading />}>
          <BlogList />
        </Suspense>
      </BlogErrorBoundary>
    </>
  );
}
