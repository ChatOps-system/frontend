import { Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ChatMessages } from '../../components/chat-messages/chat-messages';
import { ChatInput } from '../../components/chat-input/chat-input';
import { ChatService } from '../../services/chat.service';
import { IncidentDetectedToast } from '../../components/incident-detected-toast/incident-detected-toast';
import { IncidentReport } from '../../interfaces/incident-report.interface';
import { IncidentDraft } from '../../components/incident-draft/incident-draft';
import { tap } from 'rxjs';

@Component({
  selector: 'chat-page',
  imports: [ChatMessages, ChatInput, IncidentDetectedToast, IncidentDraft],
  templateUrl: './chat-page.html',
})
export class ChatPage {
  message = signal<string>('');
  chatService = inject(ChatService);
  openIncidentDetectedToast = signal<boolean>(false);
  incidentDraft = signal<IncidentReport | null>(null);
  createIncidentReportModal = viewChild<ElementRef<HTMLDialogElement>>('createIncidentReportModal');

  incidentDraftEffect = effect(() => {
    const modal = this.createIncidentReportModal();
    const draft = this.incidentDraft();
    if (!modal) return;
    if (!draft) {
      modal.nativeElement.close();
      return;
    }
    modal.nativeElement.showModal();
  });

  onChangeMessage(message: string) {
    this.message.set(message);
    this.openIncidentDetectedToast.set(false);
  }

  onCloseIncidentDetectedToast() {
    this.incidentDraft.set(null);
    this.openIncidentDetectedToast.set(false);
  }

  onCloseIncidentDraft() {
    this.incidentDraft.set(null);
  }

  detectIncident() {
    this.chatService.detectIncident(this.message()).subscribe((response) => {
      if (response.incidentDetected) {
        this.openIncidentDetectedToast.set(true);
      }
    });
  }

  generateIncidentDraft() {
    this.chatService
      .generateIncidentDraft(this.message())
      .pipe(tap(() => this.openIncidentDetectedToast.set(false)))
      .subscribe((response) => {
        this.incidentDraft.set(response);
      });
  }

  createIncidentReport(incidentReport: IncidentReport) {
    this.chatService
      .createIncidentReport(incidentReport)
      .pipe(tap(() => this.message.set('')))
      .subscribe((response) => {
        this.incidentDraft.set(null);
      });
  }
}
