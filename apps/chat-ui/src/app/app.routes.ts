import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'home',
        title: 'home',
        loadComponent: () => import('../pages/home/home.component').then(m => m.HomeComponent),
    },
    {
        path: 'chat',
        title: 'chat',
        loadComponent: () => import('../pages/chat-signals/chat-signals.component').then(m => m.ChatSignalsComponent),
    },
    {
        path: 'settings',
        title: 'settings',
        loadComponent: () => import('../pages/settings/settings.component').then(m => m.SettingsComponent),
    },
    {
        path: 'choose_chat',
        title: 'choose_chat',
        loadComponent: () => import('../pages/chat-list/chat-list.component').then(m => m.ChatListComponent),
    },
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full' 
    },
    {
        path: '**',
        title: 'Page not found',
        loadComponent: () => import('../pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
    },
];
