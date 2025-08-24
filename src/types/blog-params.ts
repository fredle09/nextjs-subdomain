export interface IBlogsParams {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: "date" | "title" | "author";
  sortOrder?: "asc" | "desc";
}
