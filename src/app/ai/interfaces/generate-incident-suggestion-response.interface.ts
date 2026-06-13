import { IncidentSuggestion } from './incident-suggestion.interface';

export interface GenerateIncidentSuggestionResponse {
  incidentSuggestion: IncidentSuggestion;
  message: string;
}
