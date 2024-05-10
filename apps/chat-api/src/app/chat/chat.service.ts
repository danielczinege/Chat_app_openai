import { Injectable } from '@nestjs/common';
import { OpenaiService } from '../openai/openai.service';

@Injectable()
export class ChatService {
    constructor(private openaiService: OpenaiService) {}

    public getAnswer(message: string) {
        return this.openaiService.createCompletion([{ role: 'user', content: message }]);
    }
}
