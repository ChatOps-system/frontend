import { inject, Injectable } from '@angular/core';
import { IncidentReport } from '../interfaces/incident-report.interface';
import { CreateIncidentReportResponse } from '../interfaces/create-incident-report-response.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IncidentReportService {
  http = inject(HttpClient);
  constructor() {}

  createIncidentReport(incidentReport: IncidentReport): Observable<CreateIncidentReportResponse> {
    return this.http.post<CreateIncidentReportResponse>(
      `${environment.backendUrl}/incident-reports`,
      incidentReport,
    );
  }
}
