import { Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ChatMessages } from '../../components/chat-messages/chat-messages';
import { ChatInput } from '../../components/chat-input/chat-input';
import { ChatService } from '../../services/chat.service';
import { IncidentReport } from '../../interfaces/incident-report.interface';
import { IncidentDraft } from '../../components/incident-draft/incident-draft';
import { tap } from 'rxjs';
import { IncidentReportsService } from '../../services/incident-reports.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'chat-page',
  imports: [ChatMessages, ChatInput, IncidentDraft],
  templateUrl: './chat-page.html',
})
export class ChatPage {
  message = signal<string>('');
  chatService = inject(ChatService);
  incidentReportsService = inject(IncidentReportsService);
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
    toast.dismiss();
  }

  onCloseIncidentDraft() {
    this.incidentDraft.set(null);
  }

  detectIncident() {
    this.chatService.detectIncident(this.message()).subscribe((response) => {
      if (response.incidentDetected) {
        toast.info('Incidente Detectado', {
          description: '¿Te gustaría crear un reporte?',
          action: {
            label: 'Crear',
            onClick: () => {
              this.generateIncidentDraft();
            },
          },
          cancel: {
            label: 'Cancelar',
          },
        });
      }
    });
  }

  generateIncidentDraft() {
    this.chatService
      .generateIncidentDraft(this.message())
      .pipe(tap(() => toast.dismiss()))
      .subscribe((response) => {
        this.incidentDraft.set(response);
      });
  }

  createIncidentReport(incidentReport: IncidentReport) {
    this.incidentReportsService
      .createIncidentReport(incidentReport)
      .pipe(
        tap(() => {
          this.message.set('');
          this.incidentDraft.set(null);
        }),
      )
      .subscribe();
  }
}
