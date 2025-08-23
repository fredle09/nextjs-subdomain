import path from "path";
import Database from "better-sqlite3";

// Create database instance
const dbPath = path.join(process.cwd(), "blog.db");
const db = new Database(dbPath);

// Enable foreign keys
db.pragma("foreign_keys = ON");

// Create blogs table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS blogs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    author TEXT NOT NULL,
    published BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create trigger to update updated_at column
db.exec(`
  CREATE TRIGGER IF NOT EXISTS update_blogs_updated_at
  AFTER UPDATE ON blogs
  BEGIN
    UPDATE blogs SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END
`);

const sampleBlogs = [
  {
    title: "Getting Started with Next.js and SQLite",
    slug: "getting-started-nextjs-sqlite",
    content: `Next.js is a powerful React framework that makes building web applications a breeze. When combined with SQLite, you get a lightweight yet powerful database solution that's perfect for many applications.

In this blog post, we'll explore how to set up a blog system using Next.js and SQLite. We'll cover:

1. Setting up the database schema
2. Creating API routes for CRUD operations
3. Building a user-friendly interface
4. Implementing server-side rendering for better SEO

SQLite is an excellent choice for smaller applications because it requires no server setup and stores data in a single file. It's perfect for blogs, portfolios, and other content-driven sites.

The combination of Next.js's powerful features like server-side rendering, API routes, and file-based routing with SQLite's simplicity makes for a great development experience.

Whether you're building a personal blog or a company website, this stack provides the flexibility and performance you need while keeping things simple and maintainable.`,
    excerpt:
      "Learn how to build a modern blog system using Next.js and SQLite. This guide covers database setup, API routes, and creating a user-friendly interface.",
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
    // Prepare statements
    const checkStmt = db.prepare("SELECT id FROM blogs WHERE slug = ?");
    const insertStmt = db.prepare(`
      INSERT INTO blogs (title, slug, content, excerpt, author, published)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

    for (const blog of sampleBlogs) {
      const existing = checkStmt.get(blog.slug);
      if (!existing) {
        const result = insertStmt.run(
          blog.title,
          blog.slug,
          blog.content,
          blog.excerpt || null,
          blog.author,
          blog.published ? 1 : 0
        );
        console.log(
          `Created blog: ${blog.title} (ID: ${result.lastInsertRowid})`
        );
      } else {
        console.log(`Blog already exists: ${blog.title}`);
      }
    }

    console.log("Database seeding completed successfully!");

    // Show summary
    const totalCount = db.prepare("SELECT COUNT(*) as count FROM blogs").get();
    const publishedCount = db
      .prepare("SELECT COUNT(*) as count FROM blogs WHERE published = 1")
      .get();

    console.log(`\nSummary:`);
    console.log(`- Total blogs: ${totalCount.count}`);
    console.log(`- Published blogs: ${publishedCount.count}`);
    console.log(`- Draft blogs: ${totalCount.count - publishedCount.count}`);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    db.close();
  }
}

// Run the seed function
seedDatabase();
