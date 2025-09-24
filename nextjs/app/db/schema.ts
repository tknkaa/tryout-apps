import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const user = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  email: varchar().notNull().unique(),
});
