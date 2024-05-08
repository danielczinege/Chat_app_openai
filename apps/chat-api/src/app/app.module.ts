import { Module } from '@nestjs/common';
import { exampleFunction } from '@ukol-01/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { OpenaiModule } from './openai/openai.module';

@Module({
  imports: [ChatModule, OpenaiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    const result = exampleFunction();
    console.log(result);
  }
}
