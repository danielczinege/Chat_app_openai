import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { OpenaiModule } from './openai/openai.module';
import { ProvisioningModule } from './provisioning/provisioning.module';

@Module({
  imports: [ChatModule, OpenaiModule, ProvisioningModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor() {}
}
