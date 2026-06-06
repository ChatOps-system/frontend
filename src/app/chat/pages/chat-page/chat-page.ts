import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ChatMessages } from '../../components/chat-messages/chat-messages';
import { ChatInput } from '../../components/chat-input/chat-input';
import { ChatService } from '../../services/chat.service';
import { tap } from 'rxjs';
import { IncidentReportsService } from '../../services/incident-reports.service';
import { toast } from 'ngx-sonner';
import { IncidentReportForm } from '../../components/incident-report-form/incident-report-form';
import { IncidentDraft } from '../../interfaces/incident-draft.interface';
import { IncidentReport } from '../../interfaces/incident-report.interface';

@Component({
  selector: 'chat-page',
  imports: [ChatMessages, ChatInput, IncidentReportForm],
  templateUrl: './chat-page.html',
})
export class ChatPage {
  message = signal<string>('');
  chatService = inject(ChatService);
  incidentReportsService = inject(IncidentReportsService);
  incidentReportFormModal = viewChild<ElementRef<HTMLDialogElement>>('incidentReportFormModal');
  incidentDraft = signal<IncidentDraft | null>(null);
  incidentDraftIsLoading = signal<boolean>(false);

  onChangeMessage(message: string) {
    this.message.set(message);
    toast.dismiss();
  }

  openIncidentReportFormModal() {
    this.incidentDraftIsLoading.set(true);
    this.incidentReportFormModal()?.nativeElement.showModal();
  }
  closeIncidentReportFormModal() {
    this.incidentReportFormModal()?.nativeElement.close();
    this.incidentDraft.set(null);
    this.incidentDraftIsLoading.set(false);
  }

  detectIncident() {
    this.chatService.detectIncident(this.message()).subscribe((response) => {
      if (response.isIncident) {
        toast.info('Incidente Detectado', {
          duration: 10000,
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
    this.openIncidentReportFormModal();
    this.chatService.generateIncidentDraft(this.message()).subscribe((response) => {
      toast.dismiss();
      this.incidentDraft.set(response.incident_draft);
      this.incidentDraftIsLoading.set(false);
    });
  }
  createIncidentReport(incidentReport: IncidentReport) {
    this.closeIncidentReportFormModal();
    this.incidentReportsService.createIncidentReport(incidentReport).subscribe((res) => {
      this.message.set('');
    });
  }
}
