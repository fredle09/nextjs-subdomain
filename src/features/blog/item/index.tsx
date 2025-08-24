import Link from "next/link";
import { CalendarDays } from "lucide-react";

import Show from "@/components/show";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

import type { IBlogVM } from "@/types/blog";

interface IBlogItemProps {
  blog: IBlogVM;
}

export function BlogItem({ blog }: IBlogItemProps) {
  return (
    <Card className="flex flex-col hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" className="text-xs">
            <CalendarDays className="w-3 h-3 mr-1" />
            {new Date(blog.created_at).toLocaleDateString()}
          </Badge>
          <div className="flex items-center gap-2">
            <Avatar className="w-6 h-6">
              <AvatarFallback className="text-xs bg-primary/10">
                {blog.author
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">{blog.author}</span>
          </div>
        </div>
        <h2 className="text-xl font-semibold leading-tight">
          <Link
            href={`/${blog.slug}`}
            className="hover:text-primary transition-colors group-hover:text-primary"
          >
            {blog.title}
          </Link>
        </h2>
      </CardHeader>
      <CardContent className="flex-1">
        <Show when={!!blog.excerpt}>
          <p className="text-muted-foreground leading-relaxed line-clamp-3 mb-3">
            {blog.excerpt}
          </p>
        </Show>
      </CardContent>
      <CardFooter className="pt-3">
        <Button
          variant="ghost"
          size="sm"
          asChild
          className="w-full justify-start group-hover:bg-primary/10"
        >
          <Link href={`/${blog.slug}`}>Read more →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
