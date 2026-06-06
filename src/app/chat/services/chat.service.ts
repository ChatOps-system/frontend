import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DetectIncidentResponse } from '../interfaces/detect-incident-response.interface';
import { catchError, Observable, throwError } from 'rxjs';
import { toast } from 'ngx-sonner';
import { IncidentDraftResponse } from '../interfaces/incident-draft-response.interface';

@Injectable({ providedIn: 'root' })
export class ChatService {
  http = inject(HttpClient);

  detectIncident(message: string): Observable<DetectIncidentResponse> {
    return this.http
      .post<DetectIncidentResponse>(`${environment.backendUrl}/chat/detect-incident`, { message })
      .pipe(catchError(this.handleError));
  }

  generateIncidentDraft(message: string): Observable<IncidentDraftResponse> {
    return this.http
      .post<IncidentDraftResponse>(`${environment.backendUrl}/chat/generate-incident-draft`, {
        message,
      })
      .pipe(catchError(this.handleError));
  }

  handleError(err: any) {
    if (err.status === 0) {
      toast.error('Servicio Backend no response', {
        description: `${err.message}`,
      });
    } else if (err.status === 503) {
      toast.error('Servicio de Inferencia no response', {
        description: `${err.message}`,
      });
    }
    return throwError(() => err);
  }
}
