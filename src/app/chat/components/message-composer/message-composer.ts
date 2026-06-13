import { Component, effect, input, output } from '@angular/core';

@Component({
  selector: 'message-composer',
  imports: [],
  templateUrl: './message-composer.html',
})
export class MessageComposer {
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
    }, 1000);
    onCleanup(() => {
      clearTimeout(timeout);
    });
  });
}
