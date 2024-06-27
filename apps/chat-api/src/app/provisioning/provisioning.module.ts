import { Module } from '@nestjs/common';
import { OnModuleInit } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import { ChatModule } from '../chat/chat.module';
import { ChatService } from '../chat/chat.service';

@Module({
    imports: [ChatModule]
})
export class ProvisioningModule implements OnModuleInit {
    numOfConversationsToGenerate = 5;
    maxDigitCountQuestions = 1; //the number of digits that questionCount can have

    constructor(private chatService: ChatService) {}

    async seed() {
        for (let i = 0; i < this.numOfConversationsToGenerate; ++i) {
            let questionCount = Number(faker.string.numeric(this.maxDigitCountQuestions));
            let customInstructions = '';
            if (i % 2 === 0) {
                customInstructions = faker.lorem.sentence({min: 1,
                                                           max: 15})
            }

            let id = 0;

            try {
                id = await this.chatService.insertConversation(
                    {title: faker.lorem.sentence({ min: 1, max: 3}),
                     chatSettings: customInstructions}
                )
            } catch (e) {
                console.error('Error while inserting message to database: ', e);
                return;
            }

            for (let j = 0; j < questionCount; ++j) {
                try {
                    await this.chatService.insertMessage(
                        id,
                        {sender: (j % 2 === 0) ? 'user' : 'assistant',
                         content: faker.lorem.sentences({ min: 1, max: 5 })
                        }
                    )
                } catch (e) {
                    console.error('Error while inserting message to database: ', e);
                    return;
                }
            }
        }
    }

    async onModuleInit() {
        if (process.env['SEED'] === 'true') {
            await this.seed();
        }
    }
}
