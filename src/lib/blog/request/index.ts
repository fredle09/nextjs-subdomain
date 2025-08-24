import { api } from "@/lib/axios";

import type { IBlogVM } from "@/types/blog";
import type { IBlogsParams } from "@/types/blog-params";

async function getFilteredBlogs(
  params: IBlogsParams
): Promise<{ blogs: IBlogVM[]; total: number }> {
  return api.get("/blogs", { params });
}

export const BlogRequest = {
  getFilteredBlogs,
};
