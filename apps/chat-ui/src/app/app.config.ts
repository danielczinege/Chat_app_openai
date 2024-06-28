import { APP_INITIALIZER, ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

export const configInitFactory = (configService: ConfigService) => () =>
  configService.init().catch((err) => console.error('APP INIT ERROR', err));

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(appRoutes),
              provideHttpClient(),
              {
                provide: APP_INITIALIZER,
                useFactory: configInitFactory,
                deps: [ConfigService],
                multi: true,
              }],
};
