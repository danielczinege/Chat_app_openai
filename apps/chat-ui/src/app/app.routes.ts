import { Route } from '@angular/router';
import { ChatComponent } from '../pages/chat/chat.component';
import { HomeComponent } from '../pages/home/home.component';
import { PageNotFoundComponent } from '../pages/page-not-found/page-not-found.component';

export const appRoutes: Route[] = [
    {
        path: 'home',
        title: 'home',
        component: HomeComponent
    },
    {
        path: 'chat',
        title: 'chat',
        component: ChatComponent
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full' 
    },
    {
        path: '**',
        title: 'Page not found',
        component: PageNotFoundComponent
    },
];
