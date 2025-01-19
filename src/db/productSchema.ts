import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";


export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  category: text(),
  Image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
  tag: text(),
});



export const createProductSchema = createInsertSchema(productsTable).omit({
  // @ts-ignore
  id: true,
});

export const updateProductSchema = createInsertSchema(productsTable)
  .omit({
    // @ts-ignore
    id: true,
  })
  .partial();
