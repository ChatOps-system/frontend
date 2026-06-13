import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatSidebar } from '../../components/chat-sidebar/chat-sidebar';

@Component({
  selector: 'app-chat-layout',
  imports: [RouterOutlet, ChatSidebar],
  templateUrl: './chat-layout.html',
})
export class ChatLayout {}
