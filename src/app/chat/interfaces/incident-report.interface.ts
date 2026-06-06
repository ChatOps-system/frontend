export type IncidentReportSeverity = 'Low' | 'Medium' | 'High';
export type IncidentReportCategory = 'Safety' | 'Operational' | 'Equipment';

export interface IncidentReport {
  title: string;
  description: string;
  severity: IncidentReportSeverity;
  category: IncidentReportCategory;
  location: string;
  immediateActions: string;
  recommendations: string;
  occurredAt: string;
}
