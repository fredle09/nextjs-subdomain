import db from "@/lib/database";

import type { TBlogDetailVM, IBlogVM } from "@/types/blog";

function getAllBlogs(published?: boolean): IBlogVM[] {
  let query = "SELECT * FROM blogs";
  const params = [];

  if (published !== undefined) {
    query += " WHERE published = ?";
    params.push(published ? 1 : 0);
  }

  query += " ORDER BY created_at DESC";

  const stmt = db.prepare(query);
  return stmt.all(...params) as IBlogVM[];
}

function getBlogById(id: number): TBlogDetailVM | null {
  const stmt = db.prepare("SELECT * FROM blogs WHERE id = ?");
  const result = stmt.get(id) as TBlogDetailVM | undefined;
  return result || null;
}

function getBlogBySlug(slug: string): TBlogDetailVM | null {
  const stmt = db.prepare("SELECT * FROM blogs WHERE slug = ?");
  const result = stmt.get(slug) as TBlogDetailVM | undefined;
  return result || null;
}

function deleteBlog(id: number): boolean {
  const stmt = db.prepare("DELETE FROM blogs WHERE id = ?");
  const result = stmt.run(id);
  return result.changes > 0;
}

function getPublishedBlogs(
  page: number = 1,
  limit: number = 10
): { blogs: IBlogVM[]; total: number } {
  const offset = (page - 1) * limit;

  const countStmt = db.prepare(
    "SELECT COUNT(*) as count FROM blogs WHERE published = 1"
  );
  const total = (countStmt.get() as { count: number }).count;

  const stmt = db.prepare(`
      SELECT * FROM blogs 
      WHERE published = 1 
      ORDER BY created_at DESC 
      LIMIT ? OFFSET ?
    `);

  const blogs = stmt.all(limit, offset) as IBlogVM[];

  return { blogs, total };
}

export interface IGetFilteredBlogsProps {
  search?: string;
  sortBy?: "date" | "title" | "author";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

function getFilteredBlogs(params: IGetFilteredBlogsProps): {
  blogs: IBlogVM[];
  total: number;
} {
  const {
    search = "",
    sortBy = "date",
    sortOrder = "desc",
    page = 1,
    limit = 10,
  } = params;

  const offset = (page - 1) * limit;
  let whereClause = "WHERE published = 1";
  let orderClause = "ORDER BY";
  const queryParams: unknown[] = [];

  if (search.trim()) {
    whereClause += " AND (title LIKE ? OR content LIKE ? OR author LIKE ?)";
    const searchTerm = `%${search.trim()}%`;
    queryParams.push(searchTerm, searchTerm, searchTerm);
  }

  switch (sortBy) {
    case "title":
      orderClause += ` title ${sortOrder.toUpperCase()}`;
      break;
    case "author":
      orderClause += ` author ${sortOrder.toUpperCase()}`;
      break;
    case "date":
    default:
      orderClause += ` created_at ${sortOrder.toUpperCase()}`;
      break;
  }

  const countQuery = `SELECT COUNT(id) as count FROM blogs ${whereClause}`;
  const countStmt = db.prepare(countQuery);
  const total = (countStmt.get(...queryParams) as { count: number }).count;

  const dataQuery = `
    SELECT * FROM blogs 
    ${whereClause} 
    ${orderClause} 
    LIMIT ? OFFSET ?
  `;
  const stmt = db.prepare(dataQuery);
  const blogs = stmt.all(...queryParams, limit, offset) as IBlogVM[];

  return { blogs, total };
}

function getAllSlugs(): string[] {
  const stmt = db.prepare("SELECT slug FROM blogs WHERE published = 1");
  const rows = stmt.all() as { slug: string }[];
  return rows.map((row) => row.slug);
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
