import {
  IncidentReportCategory,
  IncidentReportSeverity,
} from '../../incident-reports/interfaces/incident-report.interface';

export interface IncidentSuggestion {
  title: string;
  description: string;
  severity: IncidentReportSeverity;
  category: IncidentReportCategory;
  location: string;
  immediateActions: string;
  recommendations: string;
}
