import Mapping from "@/components/mapping";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from "@/components/ui/card";

export function BlogListLoading() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Mapping
        data={Array.from({ length: 2 }).map((_, i) => ({ i }))}
        as={BlogLoading}
      />
    </div>
  );
}

export function BlogLoading() {
  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-4 w-24" />
          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
        <Skeleton className="h-6 w-full" />
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </CardContent>
      <CardFooter className="pt-3">
        <Skeleton className="h-8 w-full" />
      </CardFooter>
    </Card>
  );
}
