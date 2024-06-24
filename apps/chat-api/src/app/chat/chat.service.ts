import { Inject, Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { Message } from '@ukol-01/common';
import OpenAI from 'openai';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../../db/schema';
import { eq } from 'drizzle-orm';
import { conversationMessages, messages } from '../../db/schema';


@Injectable()
export class ChatService {
    constructor(
        private openaiService: OpenaiService,
        @Inject('DB_CONVERSATIONS') private database: PostgresJsDatabase<typeof schema>,
    ) {}

    public getAnswer(messages: Message[],
                     temperature: number = 1,
                     max_tokens: number = 256) {
        let messages_for_request: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = messages.map(
            (message: Message) => ({role: message.sender, content: message.content})
        );

        return this.openaiService.createCompletion(messages_for_request, temperature, max_tokens);
    }

    public getListOfConversations() {
            return this.database.query.conversations.findMany({
                columns: {
                    id: true,
                    title: true,
                },
            });
    }

    public getConversation(id: number) {
        return this.database
            .select({
                sender: messages.sender,
                content: messages.content,
            })
            .from(messages)
            .innerJoin(conversationMessages, eq(messages.id, conversationMessages.messageId))
            .where(eq(conversationMessages.conversationId, id))
            .orderBy(messages.id);
    }
}
