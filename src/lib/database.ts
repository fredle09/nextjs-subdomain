import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "blog.db");
const db = new Database(dbPath);

db.pragma("foreign_keys = ON");

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

db.exec(`
  CREATE TRIGGER IF NOT EXISTS update_blogs_updated_at
  AFTER UPDATE ON blogs
  BEGIN
    UPDATE blogs SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
  END
`);

export default db;
