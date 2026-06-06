import { IncidentReportCategory, IncidentReportSeverity } from './incident-report.interface';

export interface IncidentDraft {
  title: string;
  description: string;
  severity: IncidentReportSeverity;
  category: IncidentReportCategory;
  location: string;
  immediateActions: string;
  recommendations: string;
}
