import ms from "ms";
import { useDebounceValue } from "usehooks-ts";
import { throttle, useQueryState } from "nuqs";

export const useFilterHooks = () => {
  const [search, setSearch] = useQueryState("search", {
    defaultValue: "",
    limitUrlUpdates: throttle(500),
  });
  const [searchDebounced] = useDebounceValue(search, ms("0.4s"));

  const [sortBy, setSortBy] = useQueryState("sortBy", {
    defaultValue: "date" as const,
    parse: (value) => {
      if (["date", "title", "author"].includes(value)) {
        return value as "date" | "title" | "author";
      }
      return "date";
    },
  });
  const [sortOrder, setSortOrder] = useQueryState("sortOrder", {
    defaultValue: "desc" as const,
    parse: (value) => {
      if (["asc", "desc"].includes(value)) {
        return value as "asc" | "desc";
      }
      return "desc";
    },
  });
  const [page] = useQueryState("page", {
    defaultValue: 1,
    parse: (value) => {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 1 : parsed;
    },
  });
  const [limit] = useQueryState("limit", {
    defaultValue: 10,
    parse: (value) => {
      const parsed = parseInt(value, 10);
      return isNaN(parsed) ? 10 : parsed;
    },
  });

  return {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    searchDebounced,

    setSortBy,
    setSearch,
    setSortOrder,
  };
};
