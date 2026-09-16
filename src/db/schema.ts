import { pgTable, serial, text, varchar, integer, timestamp } from 'drizzle-orm/pg-core';

export const rsvps = pgTable('rsvps', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  attendance: varchar('attendance', { length: 20 }).notNull(), // 'HADIR' | 'TIDAK_HADIR'
  guestCount: integer('guest_count').notNull().default(1),
  message: text('message').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

export type RSVPInsert = typeof rsvps.$inferInsert;
export type RSVPSelect = typeof rsvps.$inferSelect;
