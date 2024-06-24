import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { OpenaiModule } from '../openai/openai.module';
import { DrizzlePostgresModule } from '@knaadh/nestjs-drizzle-postgres';
import * as schema from '../../db/schema';

@Module({
    imports: [
        OpenaiModule,
        DrizzlePostgresModule.register({
            tag: 'DB_CONVERSATIONS',
            postgres: {
              url: 'postgres://postgres:postgres@localhost:5432/postgres',
            },
            config: { schema: { ...schema } },
          }),],
    providers: [ChatService],
    controllers: [ChatController],
})
export class ChatModule {}
