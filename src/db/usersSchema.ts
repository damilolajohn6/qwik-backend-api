import { integer, pgTable, text, varchar  } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";


export const usersTable = pgTable('users',{
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    email: varchar({length: 255}).unique().notNull(),
    password: varchar({length: 255}).notNull(),
    role: varchar({length: 255}).notNull().default('user'),

    name: varchar({length: 255}),
    address: text(),
})

export const createUsersSchema = createInsertSchema(usersTable).omit({
  // @ts-ignore
  id: true,
  role: true,
});

export const loginSchema = createInsertSchema(usersTable).pick({
    email: true,
    password: true,
})
