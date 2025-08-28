This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Database Migration

This project has been migrated from **better-sqlite3** to **PostgreSQL** with **Prisma ORM**. The migration includes:

- ✅ Replaced SQLite database with PostgreSQL
- ✅ Migrated to Prisma ORM for type-safe database operations
- ✅ Updated all database service functions to async/await
- ✅ Maintained the same API and functionality
- ✅ Added proper TypeScript types for all operations

## Getting Started

### Prerequisites

1. **Database Setup**: Set up your PostgreSQL database through Vercel or another provider
2. **Environment Variables**: Update `.env` file with your database connection string

### Environment Variables

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://username:password@hostname:port/database_name"
# Replace with your actual PostgreSQL connection string
```

### Installation and Setup

1. Install dependencies:

```bash
pnpm install
```

2. Generate Prisma client:

```bash
pnpm run db:generate
```

3. Push the database schema:

```bash
pnpm run db:push
```

4. Seed the database with sample data:

```bash
pnpm run db:seed
```

5. Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build the application
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm run db:generate` - Generate Prisma client
- `pnpm run db:push` - Push schema changes to database
- `pnpm run db:migrate` - Create and run migrations
- `pnpm run db:seed` - Seed database with sample data

## Database Schema

The blog posts are stored in a PostgreSQL table with the following structure:

```sql
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  slug VARCHAR UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  author VARCHAR NOT NULL,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## Tech Stack

- **Framework**: Next.js 15
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **Deployment**: Vercel

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Prisma Documentation](https://www.prisma.io/docs) - learn about Prisma ORM
- [PostgreSQL Documentation](https://www.postgresql.org/docs) - learn about PostgreSQL
- [Tailwind CSS](https://tailwindcss.com/docs) - utility-first CSS framework

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Make sure to:
1. Set up your PostgreSQL database in Vercel
2. Add your environment variables in the Vercel dashboard
3. The build process will automatically run `prisma generate`

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
