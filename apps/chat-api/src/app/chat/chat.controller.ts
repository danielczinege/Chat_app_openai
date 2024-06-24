import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Conversation, IResponse, InternalError, Message, MessageRequest } from '@ukol-01/common';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post()
    async messageReceiver(@Body() body: MessageRequest) {
        console.log('received message: ', body.messages[body.messages.length - 1].content);

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

    @Get(':id')
    async getConversationMsgs(@Param('id') id: number) {
        const msgs = await this.chatService.getConversation(id).catch((e) => {
            console.error('Error while fetching messages of the conversation: ', e);
            throw new InternalError(
                'There was an error processing your request. Please try again later.'
            );
        });

        return msgs as Message[];
    }

    @Get('conversations')
    async listAllConversations() {
        const conversations = await this.chatService.getListOfConversations().catch((e) => {
            console.error('Error while fetching conversations: ', e);
            throw new InternalError(
                'There was an error processing your request. Please try again later.'
            );
        });

        return conversations as Conversation[];
    }
}
