import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DetectIncidentResponse } from '../interfaces/detect-incident-response.interface';
import { Observable } from 'rxjs';
import { GenerateIncidentSuggestionResponse } from '../interfaces/generate-incident-suggestion-response.interface';
import { CreateIncidentReportResponse } from '../interfaces/create-incident-report-response.interface';
import { IncidentReport } from '../interfaces/incident-report.interface';

@Injectable({ providedIn: 'root' })
export class ChatService {
  http = inject(HttpClient);

  detectIncident(message: string): Observable<DetectIncidentResponse> {
    return this.http.post<DetectIncidentResponse>(
      `${environment.backendUrl}/chat/detect-incident`,
      { message },
    );
  }

  generateIncidentSuggestion(message: string): Observable<GenerateIncidentSuggestionResponse> {
    return this.http.post<GenerateIncidentSuggestionResponse>(
      `${environment.backendUrl}/chat/generate-incident-suggestion`,
      { message },
    );
  }

  createIncidentReport(incidentReport: IncidentReport): Observable<CreateIncidentReportResponse> {
    return this.http.post<CreateIncidentReportResponse>(
      `${environment.backendUrl}/incident-reports`,
      incidentReport,
    );
  }
}
