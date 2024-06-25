import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ChatService } from './chat.service';
import { Conversation, ConversationInsertRequest, IResponse, InternalError, Message, MessageRequest } from '@ukol-01/common';

@Controller('chat')
export class ChatController {
    constructor(private chatService: ChatService) {}

    @Post()
    async messageReceiver(@Body() body: MessageRequest) {
        console.log('received message: ', body.messages[body.messages.length - 1].content);

        await this.chatService.insertMessage(body.conversationID, body.messages[body.messages.length - 1]).catch((e) => {
            console.error('Error while inserting message to database: ', e);
        });

        const answer = await this.chatService.getAnswer(body.messages,
                                                        body.temperature,
                                                        body.max_tokens).catch((e) => {
            console.error('Error while fetching the completion:', e);
            throw new InternalError(
                'There was an error processing your request. Please try again later.'
            );
        });

        const response = answer.choices[0].message.content;

        await this.chatService.insertMessage(body.conversationID, {
            sender: 'assistant',
            content: response,
        }).catch((e) => {
            console.error('Error while inserting response to database: ', e);
        });

        console.log('got answer: ', response);
        return {
            message: response,
        } as IResponse;
    }

    @Delete(':id')
    async deleteConversation(@Param('id') id: number) {
        return await this.chatService.deleteConversation(id);
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

    @Post('conversation')
    async insertConversation(@Body() conversation: ConversationInsertRequest) {
        const inserted = await this.chatService.insertConversation(conversation);

        return inserted[0].id;
    }
}
