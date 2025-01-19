import { integer, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const blogTable = pgTable("blogs", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }),
  content: text().notNull(),
  Image: varchar({ length: 255 }),
  createdAt: timestamp().notNull().defaultNow(),
  updatedAt: timestamp().defaultNow(),
});

export const createBlogSchema = createInsertSchema(blogTable).omit({
  // @ts-ignore
  id: true,
});

export const updateBlogSchema = createInsertSchema(blogTable)
  .omit({
    // @ts-ignore
    id: true,
  })
  .partial();
