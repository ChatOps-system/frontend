import { Component, output } from '@angular/core';

@Component({
  selector: 'app-suggestion-toast',
  imports: [],
  templateUrl: './suggestion-toast.html',
})
export class SuggestionToast {
  closeSuggestionToast = output<void>();
  generateIncidentReport = output<void>();
}
