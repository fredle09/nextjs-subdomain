"use server";

import { BlogService, IGetFilteredBlogsProps } from "../service";

export async function getAllSlugs() {
  return BlogService.getAllSlugs();
}

export async function getFilteredBlogs(params: IGetFilteredBlogsProps) {
  return BlogService.getFilteredBlogs(params);
}
