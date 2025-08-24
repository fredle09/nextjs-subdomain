export interface IBlog {
  id: number;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface IBlogVM extends Omit<IBlog, "content"> {
  wordCount: number;
}

export type TBlogDetailVM = IBlog;
