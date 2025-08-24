"use client";

import { useSuspenseQuery } from "@tanstack/react-query";

import Mapping from "@/components/mapping";
import BlogItem from "@/features/blog/item";
import { getFilteredBlogsOptions } from "@/features/blog/utils";

export default function BridgeBlogList() {
  const { data: blogs } = useSuspenseQuery(getFilteredBlogsOptions({}));

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Mapping
        data={blogs}
        as={BlogItem}
        keyProps="id"
        transform={(blog) => ({ blog })}
      />
    </div>
  );
}
