import { Body, Controller, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { IResponse, InternalError, MessageRequest } from '@ukol-01/common';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post()
    async messageReceiver(@Body() body: MessageRequest) {
        console.log('received message: ', body.messages[body.messages.length]);

        const answer = await this.chatService.getAnswer(body.messages,
                                                        body.temperature,
                                                        body.max_tokens).catch((e) => {
            console.error('Error while fetching the completion:', e);
            throw new InternalError(
                'There was an error processing your request. Please try again later.'
            );
        });

        console.log('got answer: ', answer.choices[0].message.content);
        return {
            message: answer.choices[0].message.content,
        } as IResponse;
    }
}
