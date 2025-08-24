import Mapping from "@/components/mapping";

import { BlogLoading } from "../item/loading";

export function BlogListLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Mapping
        data={Array.from({ length: 2 }).map((_, i) => ({ i }))}
        as={BlogLoading}
      />
    </div>
  );
}
