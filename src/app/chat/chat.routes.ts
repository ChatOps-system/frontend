import { Routes } from '@angular/router';
import { ChatPage } from './pages/chat-page/chat-page';

export const chatRoutes: Routes = [
  {
    path: '',
    component: ChatPage,
  },
  {
    path: '**',
    redirectTo: '',
  },
];

export default chatRoutes;
