import { Module } from '@nestjs/common';
import { exampleFunction } from '@ukol-01/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [ChatModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {
    const result = exampleFunction();
    console.log(result);
  }
}
