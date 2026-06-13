import { Component, ElementRef, inject, signal, viewChild } from '@angular/core';
import { IncidentReportForm } from '../../../incident-reports/components/incident-report-form/incident-report-form';
import { IncidentSuggestion } from '../../../ai/interfaces/incident-suggestion.interface';
import { IncidentReport } from '../../../incident-reports/interfaces/incident-report.interface';
import { MessageList } from '../../components/message-list/message-list';
import { MessageComposer } from '../../components/message-composer/message-composer';
import { IncidentReportService } from '../../../incident-reports/services/incident-report.service';
import { toast } from 'ngx-sonner';
import { IncidentSuggestionService } from '../../../ai/services/incident-suggestion.service';
import { IncidentDetectionService } from '../../../ai/services/incident-detection.service';

@Component({
  selector: 'chat-page',
  imports: [MessageList, MessageComposer, IncidentReportForm],
  templateUrl: './chat-page.html',
})
export class ChatPage {
  message = signal<string>('');
  incidentSuggestionService = inject(IncidentSuggestionService);
  incidentDetectionService = inject(IncidentDetectionService);

  incidentReportService = inject(IncidentReportService);
  incidentReportFormDialog = viewChild<ElementRef<HTMLDialogElement>>('incidentReportFormDialog');
  incidentSuggestion = signal<IncidentSuggestion | null>(null);
  incidentSuggestionIsLoading = signal<boolean>(false);

  updateMessage(message: string) {
    this.message.set(message);
    toast.dismiss();
  }

  openIncidentReportFormDialog() {
    this.incidentSuggestionIsLoading.set(true);
    this.incidentReportFormDialog()?.nativeElement.show();
  }
  closeIncidentReportFormDialog() {
    this.incidentReportFormDialog()?.nativeElement.close();
    this.incidentSuggestion.set(null);
    this.incidentSuggestionIsLoading.set(false);
  }

  detectIncident() {
    this.incidentDetectionService.detectIncident(this.message()).subscribe({
      next: (response) => {
        if (response.isIncident) {
          toast.info('Incidente Detectado', {
            description: '¿Te gustaría crear un reporte de incidente?',
            action: {
              label: 'Crear',
              onClick: () => this.generateIncidentSuggestion(),
            },
            cancel: {
              label: 'Cerrar',
            },
          });
        }
      },
      error: this.handleError,
    });
  }

  generateIncidentSuggestion() {
    this.openIncidentReportFormDialog();
    this.incidentSuggestionService.generateIncidentSuggestion(this.message()).subscribe({
      next: (response) => {
        toast.dismiss();
        this.incidentSuggestion.set(response.incidentSuggestion);
        this.incidentSuggestionIsLoading.set(false);
      },
      error: (err) => {
        this.handleError(err);
        this.closeIncidentReportFormDialog();
      },
    });
  }

  createIncidentReport(incidentReport: IncidentReport) {
    this.closeIncidentReportFormDialog();
    this.incidentReportService.createIncidentReport(incidentReport).subscribe({
      next: (res) => {
        toast.info(`Reporte de Incidente creado exitosamente`, {
          description: `Reporte de Incidente creado con titulo: ${res.incidentReport.title}`,
        });
        this.message.set('');
      },
      error: this.handleError,
    });
  }

  handleError(err: any) {
    if (err.status === 0) {
      toast.error('Servicio Backend no response', {
        description: `${err.message}`,
      });
    } else if (err.status === 422) {
      toast.error('No se pudo generar una sugerencia válida', {
        description: 'El modelo respondió con un formato inválido o incompleto.',
      });
    } else if (err.status === 503) {
      toast.error('Servicio de Inferencia no response', {
        description: `${err.message}`,
      });
    } else {
      toast.error('Error inesperado', {
        description: err?.message || 'Ha ocurrido un error desconocido',
      });
    }
  }
}
