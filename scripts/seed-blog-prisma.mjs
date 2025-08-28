import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sampleBlogs = [
  {
    title: "Getting Started with Next.js and PostgreSQL",
    slug: "getting-started-nextjs-postgresql",
    content: `Next.js is a powerful React framework that makes building web applications a breeze. When combined with PostgreSQL, you get a robust and scalable database solution that's perfect for many applications.

In this blog post, we'll explore how to set up a blog system using Next.js and PostgreSQL with Prisma. We'll cover:

1. Setting up the database schema with Prisma
2. Creating API routes for CRUD operations
3. Building a user-friendly interface
4. Implementing server-side rendering for better SEO

PostgreSQL is an excellent choice for applications that need ACID compliance, complex queries, and scalability. It's perfect for blogs, e-commerce sites, and enterprise applications.

The combination of Next.js's powerful features like server-side rendering, API routes, and file-based routing with PostgreSQL's robustness and Prisma's type-safe ORM makes for an exceptional development experience.

Whether you're building a personal blog or a company website, this stack provides the flexibility, performance, and type safety you need while maintaining excellent developer experience.`,
    excerpt:
      "Learn how to build a modern blog system using Next.js, PostgreSQL, and Prisma. This guide covers database setup, API routes, and creating a type-safe interface.",
    author: "John Doe",
    published: true,
  },
  {
    title: "Modern Web Development Best Practices",
    slug: "modern-web-development-best-practices",
    content: `Web development has evolved significantly over the years. Today's developers have access to powerful tools and frameworks that make building complex applications more manageable than ever.

Here are some key best practices every modern web developer should follow:

**Performance First**
- Optimize images and assets
- Implement lazy loading
- Use efficient bundling strategies
- Minimize JavaScript bundle sizes

**Accessibility Matters**
- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation works
- Test with screen readers

**Security is Essential**
- Validate all user inputs
- Use HTTPS everywhere
- Implement proper authentication
- Keep dependencies updated

**Developer Experience**
- Use TypeScript for better type safety
- Implement proper error handling
- Write comprehensive tests
- Use modern tooling like ESLint and Prettier

**SEO and User Experience**
- Implement proper meta tags
- Optimize for Core Web Vitals
- Ensure mobile responsiveness
- Provide clear navigation

By following these practices, you'll build applications that are not only functional but also secure, accessible, and performant.`,
    excerpt:
      "Essential best practices for modern web development covering performance, accessibility, security, and user experience.",
    author: "Jane Smith",
    published: true,
  },
  {
    title: "The Future of Full-Stack Development",
    slug: "future-fullstack-development",
    content: `Full-stack development continues to evolve at a rapid pace. New technologies, frameworks, and methodologies emerge regularly, changing how we build and deploy applications.

**Current Trends**

The current landscape is dominated by:
- React-based frameworks like Next.js and Remix
- TypeScript adoption across the industry
- Serverless and edge computing
- JAMstack architecture
- Component-driven development

**Emerging Technologies**

Looking ahead, we're seeing interesting developments in:
- WebAssembly for better performance
- AI-assisted coding and development
- Micro-frontends for large applications
- Advanced state management solutions
- Real-time collaboration tools

**Skills for the Future**

To stay relevant, full-stack developers should focus on:
- Understanding core web fundamentals
- Mastering at least one modern framework deeply
- Learning cloud technologies and deployment strategies
- Developing strong problem-solving skills
- Staying updated with industry trends

**The Role of AI**

AI is increasingly becoming a part of the development process:
- Code generation and completion
- Automated testing and bug detection
- Performance optimization suggestions
- Design-to-code conversion

The future looks bright for full-stack developers who adapt to these changes and continue learning.`,
    excerpt:
      "Exploring the evolving landscape of full-stack development and what developers need to know for the future.",
    author: "Alex Johnson",
    published: true,
  },
  {
    title: "Draft: Advanced TypeScript Patterns",
    slug: "advanced-typescript-patterns",
    content: `This is a draft post about advanced TypeScript patterns. It covers generics, conditional types, and other advanced features that can help you write better, more type-safe code.

Content coming soon...`,
    excerpt:
      "Deep dive into advanced TypeScript patterns and techniques for writing better code.",
    author: "Sarah Wilson",
    published: false,
  },
];

async function seedDatabase() {
  console.log("Seeding database with sample blog posts...");

  try {
    for (const blog of sampleBlogs) {
      const existing = await prisma.blog.findUnique({
        where: { slug: blog.slug },
      });

      if (!existing) {
        const result = await prisma.blog.create({
          data: blog,
        });
        console.log(`Created blog: ${blog.title} (ID: ${result.id})`);
      } else {
        console.log(`Blog already exists: ${blog.title}`);
      }
    }

    console.log("Database seeding completed successfully!");

    // Show summary
    const totalCount = await prisma.blog.count();
    const publishedCount = await prisma.blog.count({
      where: { published: true },
    });

    console.log(`\nSummary:`);
    console.log(`- Total blogs: ${totalCount}`);
    console.log(`- Published blogs: ${publishedCount}`);
    console.log(`- Draft blogs: ${totalCount - publishedCount}`);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the seed function
seedDatabase();
