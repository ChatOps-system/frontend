import { Routes } from '@angular/router';
import { ChatSidebar } from './chat/layout/chat-sidebar/chat-sidebar';

export const routes: Routes = [
  {
    path: '',
    component: ChatSidebar,
    loadChildren: () => import('./chat/chat.routes').then((m) => m.default),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
