export interface GenerateIncidentSuggestionResponse {
  title: string;
  description: string;
  severity: 'Low' | 'Medium' | 'High';
}
