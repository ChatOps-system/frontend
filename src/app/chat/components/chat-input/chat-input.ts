import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'app-chat-input',
  imports: [],
  templateUrl: './chat-input.html',
})
export class ChatInput {
  message = input.required<string>();
  changeMessage = output<string>();
  detectIncident = output<void>();

  debounceEffect = effect((onCleanup) => {
    const message = this.message();
    if (!message) {
      return;
    }
    const timeout = setTimeout(() => {
      this.detectIncident.emit();
    }, 2000);
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
