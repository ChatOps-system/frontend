import { Routes } from '@angular/router';
import { ChatLayout } from './chat/layout/chat-layout/chat-layout';

export const routes: Routes = [
  {
    path: '',
    component: ChatLayout,
    loadChildren: () => import('./chat/chat.routes').then((m) => m.default),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
