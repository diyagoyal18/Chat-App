import { pgTable, serial, text, varchar, timestamp, boolean } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: serial('id').primaryKey(),
    email: varchar('email', { length: 255 }).notNull()
});

export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    senderId: varchar('sender_id', { length: 50 }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').defaultNow()
});

export const notifications = pgTable('notifications', {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 50 }).notNull(),
    messageId: varchar('message_id', { length: 50 }).notNull(),
    isRead: boolean('is_read').default(false),
    createdAt: timestamp('created_at').defaultNow()
});