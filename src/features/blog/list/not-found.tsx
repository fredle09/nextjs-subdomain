import { Card, CardHeader } from "@/components/ui/card";

interface IBlogListNotFoundProps {
  search: string;
}

export default function BlogListNotFound({ search }: IBlogListNotFoundProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <h2 className="text-2xl font-semibold mb-2">
          {search ? "No posts found" : "No blog posts yet"}
        </h2>
        <p className="text-muted-foreground">
          {search
            ? `No posts match "${search}". Try a different search term.`
            : "Check back later for new content, or create your first blog post."}
        </p>
      </CardHeader>
      {/* TODO: Uncomment when implement create new post */}
      {/* <CardFooter className="flex justify-center">
        <Button asChild>
          <Link href="/create">Create First Post</Link>
        </Button>
      </CardFooter> */}
    </Card>
  );
}
