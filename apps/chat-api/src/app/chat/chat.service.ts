import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';
import { Message } from '@ukol-01/common';
import OpenAI from 'openai';

@Injectable()
export class ChatService {
    constructor(private openaiService: OpenaiService) {}

    public getAnswer(messages: Message[],
                     temperature: number = 1,
                     max_tokens: number = 256) {
        let messages_for_request: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = messages.map(
            (message: Message) => ({role: message.who, content: message.content})
        );

        return this.openaiService.createCompletion(messages_for_request, temperature, max_tokens);
    }
}
