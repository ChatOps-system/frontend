export interface CreateIncidentReportResponse {
  message: string;
  incidentReport: {
    id: number;
    title: string;
    description: string;
    severity: 'Low' | 'Medium' | 'High';
    category: 'Safety' | 'Operational' | 'Equipment';
    location: string;
    occurredAt: Date;
    immediateActions: string;
    recommendations: string;
  };
}
