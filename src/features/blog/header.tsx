"use client";

import { Search, Filter, SortAsc } from "lucide-react";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { useFilterHooks } from "./list/hooks";

export function BlogHeader() {
  const {
    search,
    sortBy,
    sortOrder,

    setSearch: onSearchChange,
    setSortBy: onSortChange,
    setSortOrder: onSortOrderChange,
  } = useFilterHooks();

  return (
    <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="flex gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Sort by {sortBy}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onSortChange("date")}>
              Date
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("title")}>
              Title
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onSortChange("author")}>
              Author
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")
          }
        >
          <SortAsc
            className={cn("size-4", {
              "rotate-180": sortOrder === "desc",
            })}
          />
        </Button>
      </div>
    </div>
  );
}
