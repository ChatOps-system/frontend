import { Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ChatMessages } from '../../components/chat-messages/chat-messages';
import { ChatInput } from '../../components/chat-input/chat-input';
import { ChatService } from '../../services/chat.service';
import { SuggestionToast } from '../../components/suggestion-toast/suggestion-toast';
import { IncidentReportSuggested } from '../../components/incident-report-suggested/incident-report-suggested';
import { IncidentReport } from '../../interfaces/incident-report.interface';

@Component({
  selector: 'app-chat-page',
  imports: [ChatMessages, ChatInput, SuggestionToast, IncidentReportSuggested],
  templateUrl: './chat-page.html',
})
export class ChatPage {
  message = signal<string>('');
  chatService = inject(ChatService);
  openSuggestionToast = signal<boolean>(false);
  incidentReportSuggested = signal<IncidentReport | null>(null);
  incidentReportSuggestionModal = viewChild<ElementRef<HTMLDialogElement>>('suggestionModal');

  incidentReportSuggestedEffect = effect(() => {
    const modal = this.incidentReportSuggestionModal();
    const suggestion = this.incidentReportSuggested();
    if (!modal) {
      return;
    } else if (!suggestion) {
      modal.nativeElement.close();
      return;
    }
    modal.nativeElement.showModal();
  });

  onChangeMessage(message: string) {
    this.message.set(message);
    this.openSuggestionToast.set(false);
  }

  onCloseSuggestionToast() {
    this.incidentReportSuggested.set(null);
    this.openSuggestionToast.set(false);
  }

  detectIncident() {
    this.chatService.detectIncident(this.message()).subscribe((response) => {
      if (response.incidentDetected) {
        this.openSuggestionToast.set(true);
      }
    });
  }

  generateIncidentReport() {
    this.chatService.generateIncidentSuggestion(this.message()).subscribe((response) => {
      this.incidentReportSuggested.set(response);
    });
  }

  createIncidentReport(incidentReport: IncidentReport) {
    this.chatService.createIncidentReport(incidentReport).subscribe((response) => {
      console.log('Incident report created:', response);
      this.incidentReportSuggested.set(null);
      this.openSuggestionToast.set(false);
    });
  }
}
