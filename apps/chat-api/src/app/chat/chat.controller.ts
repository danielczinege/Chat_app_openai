import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { IResponse, InternalError } from '@ukol-01/common';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post()
    async messageReceiver(@Body() message: string) {
        console.log('received message', message);

        const answer = await this.chatService.getAnswer(message).catch((e) => {
            console.error('Error while fetching the completion:', e);
            throw new InternalError(
                'There was an error processing your request. Please try again later.'
            );
        });

        console.log('got answer', answer.choices[0].message.content);
        return {
            message: answer.choices[0].message.content,
        } as IResponse;
    }
}
