import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenerateIncidentSuggestionResponse } from '../interfaces/generate-incident-suggestion-response.interface';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class IncidentSuggestionService {
  http = inject(HttpClient);

  generateIncidentSuggestion(message: string): Observable<GenerateIncidentSuggestionResponse> {
    return this.http.post<GenerateIncidentSuggestionResponse>(
      `${environment.backendUrl}/ai/generate-incident-suggestion`,
      {
        message,
      },
    );
  }
}
