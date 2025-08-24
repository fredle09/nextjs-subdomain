import { Clock, Eye, ThumbsUp } from "lucide-react";

import { cn } from "@/lib/utils";
import Show from "@/components/show";
import { Badge } from "@/components/ui/badge";

interface BlogStatsProps {
  content: string;
  views?: number;
  likes?: number;
  className?: string;
}

export function BlogStats({
  content,
  views = 0,
  likes = 0,
  className,
}: BlogStatsProps) {
  const wordCount = content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <Badge variant="outline" className="text-xs">
        <Clock className="w-3 h-3 mr-1" />
        {readingTime} min read
      </Badge>

      <Show when={views > 0}>
        <Badge variant="outline" className="text-xs">
          <Eye className="w-3 h-3 mr-1" />
          {views} views
        </Badge>
      </Show>

      <Show when={likes > 0}>
        <Badge variant="outline" className="text-xs">
          <ThumbsUp className="w-3 h-3 mr-1" />
          {likes} likes
        </Badge>
      </Show>
    </div>
  );
}
