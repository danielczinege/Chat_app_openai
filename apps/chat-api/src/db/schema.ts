import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const conversations = pgTable('conversations', {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
});

export const messages = pgTable('messages', {
    id: serial('id').primaryKey(),
    sender: text('user').notNull(),
    content: text('content').notNull(),
});

export const conversationMessages = pgTable('conversation_messages', {
    conversationId: integer('conversation_id').references(() => conversations.id),
    messageId: integer('message_id').references(() => messages.id),
});
