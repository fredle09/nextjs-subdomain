import prisma from "@/lib/database";

import type { TBlogDetailVM, IBlogVM, IBlog } from "@/types/blog";

function addWordCount(blog: IBlog): IBlogVM {
  const wordCount = blog.content.split(/\s+/).length;
  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt,
    author: blog.author,
    published: blog.published,
    createdAt: blog.createdAt,
    updatedAt: blog.updatedAt,
    wordCount,
  };
}

async function getAllBlogs(published?: boolean): Promise<IBlogVM[]> {
  const where = published !== undefined ? { published } : {};
  
  const blogs = await prisma.blog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });
  
  return blogs.map(addWordCount);
}

async function getBlogById(id: number): Promise<TBlogDetailVM | null> {
  return prisma.blog.findUnique({
    where: { id },
  });
}

async function getBlogBySlug(slug: string): Promise<TBlogDetailVM | null> {
  return prisma.blog.findUnique({
    where: { slug },
  });
}

async function deleteBlog(id: number): Promise<boolean> {
  try {
    await prisma.blog.delete({
      where: { id },
    });
    return true;
  } catch {
    return false;
  }
}

async function getPublishedBlogs(
  page: number = 1,
  limit: number = 10
): Promise<{ blogs: IBlogVM[]; total: number }> {
  const offset = (page - 1) * limit;

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    }),
    prisma.blog.count({
      where: { published: true },
    }),
  ]);

  return { blogs: blogs.map(addWordCount), total };
}

export interface IGetFilteredBlogsProps {
  search?: string;
  sortBy?: "date" | "title" | "author";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

async function getFilteredBlogs(params: IGetFilteredBlogsProps): Promise<{
  blogs: IBlogVM[];
  total: number;
}> {
  const {
    search = "",
    sortBy = "date",
    sortOrder = "desc",
    page = 1,
    limit = 10,
  } = params;

  const offset = (page - 1) * limit;
  
  interface WhereClause {
    published: boolean;
    OR?: Array<{
      title?: { contains: string; mode: 'insensitive' };
      content?: { contains: string; mode: 'insensitive' };
      author?: { contains: string; mode: 'insensitive' };
    }>;
  }
  
  const where: WhereClause = { published: true };
  
  if (search.trim()) {
    const searchTerm = search.trim();
    where.OR = [
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { content: { contains: searchTerm, mode: 'insensitive' } },
      { author: { contains: searchTerm, mode: 'insensitive' } },
    ];
  }

  const orderBy: Record<string, string> = {};
  switch (sortBy) {
    case "title":
      orderBy.title = sortOrder;
      break;
    case "author":
      orderBy.author = sortOrder;
      break;
    case "date":
    default:
      orderBy.createdAt = sortOrder;
      break;
  }

  const [blogs, total] = await Promise.all([
    prisma.blog.findMany({
      where,
      orderBy,
      take: limit,
      skip: offset,
    }),
    prisma.blog.count({ where }),
  ]);

  return { blogs: blogs.map(addWordCount), total };
}

async function getAllSlugs(): Promise<string[]> {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    select: { slug: true },
  });
  
  return blogs.map((blog: { slug: string }) => blog.slug);
}

export const BlogService = {
  getAllBlogs,
  getBlogById,
  getBlogBySlug,
  deleteBlog,
  getPublishedBlogs,
  getFilteredBlogs,
  getAllSlugs,
};
