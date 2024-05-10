import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class OpenaiService {
    public readonly openaiClient!: OpenAI;

    constructor() {
        this.openaiClient = new OpenAI({ apiKey: process.env['OPENAI_API_KEY'] });
    }

    createCompletion(
        messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[],
        model: OpenAI.Chat.ChatModel = 'gpt-3.5-turbo-0125',
    ) {
        return this.openaiClient.chat.completions.create({
            messages,
            model,
          });
    }
}
