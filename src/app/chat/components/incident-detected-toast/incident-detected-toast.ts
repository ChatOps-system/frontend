import { Component, output } from '@angular/core';

@Component({
  selector: 'chat-incident-detected-toast',
  imports: [],
  templateUrl: './incident-detected-toast.html',
})
export class IncidentDetectedToast {
  closeIncidentDetectedToast = output<void>();
  generateIncidentDraft = output<void>();
}
