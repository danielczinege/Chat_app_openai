import { Injectable } from '@nestjs/common';
import { OpenaiService } from 'openai/openai.service';

@Injectable()
export class ChatService {
    constructor(private openaiService: OpenaiService) {}

    public getAnswer(text: string) {
        return this.openaiService.
    }
}
