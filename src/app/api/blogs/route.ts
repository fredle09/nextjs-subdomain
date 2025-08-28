import { NextRequest } from "next/server";

import { BlogService } from "@/lib/blog/service";

import type { IGetFilteredBlogsProps } from "@/lib/blog/service";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const params: IGetFilteredBlogsProps = {
    search: searchParams.get("search") || undefined,
    sortBy:
      (searchParams.get("sortBy") as "date" | "title" | "author") || "date",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    page: Number(searchParams.get("page")) || 1,
    limit: Number(searchParams.get("limit")) || 10,
  };

  try {
    const result = await BlogService.getFilteredBlogs(params);
    return Response.json(result);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return Response.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}
