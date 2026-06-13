import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DetectIncidentResponse } from '../interfaces/detect-incident-response.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IncidentDetectionService {
  http = inject(HttpClient);
  detectIncident(message: string): Observable<DetectIncidentResponse> {
    return this.http.post<DetectIncidentResponse>(`${environment.backendUrl}/ai/detect-incident`, {
      message,
    });
  }
}
