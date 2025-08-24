import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Hash } from "lucide-react";

import Show from "@/components/show";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BlogService } from "@/lib/blog/service";
import { BlogStats } from "@/features/blog/stats";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import type { Metadata } from "next";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = BlogService.getBlogBySlug(slug);

  if (!blog) {
    return {
      title: "Blog Post Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.excerpt || blog.content.substring(0, 160),
  };
}

export async function generateStaticParams() {
  const slugs = BlogService.getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blog = BlogService.getBlogBySlug(slug);

  if (!blog || !blog.published) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="ghost" asChild className="mb-8">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-6">
              {blog.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="text-sm">
                    {blog.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{blog.author}</span>
              </div>

              <Separator orientation="vertical" className="h-4" />

              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                <time dateTime={blog.created_at}>
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>

              <Show when={blog.updated_at !== blog.created_at}>
                <Separator orientation="vertical" className="h-4" />
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    Updated {new Date(blog.updated_at).toLocaleDateString()}
                  </span>
                </div>
              </Show>
            </div>

            <div className="mt-4">
              <BlogStats content={blog.content} />
            </div>
          </header>

          <Card className="mb-8">
            <CardContent className="p-8">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <div
                  dangerouslySetInnerHTML={{
                    __html: blog.content.replace(/\n/g, "<br>"),
                  }}
                />
              </div>
            </CardContent>
          </Card>

          <footer className="border-t pt-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <Button asChild variant="outline">
                <Link href="/">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  All Posts
                </Link>
              </Button>

              <Badge variant="secondary" className="flex items-center gap-1">
                <Hash className="w-3 h-3" />
                ID: {blog.id}
              </Badge>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
