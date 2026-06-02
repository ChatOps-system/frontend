import { Component, input, output } from '@angular/core';
import { IncidentReport } from '../../interfaces/incident-report.interface';

@Component({
  selector: 'app-incident-report-suggested',
  imports: [],
  templateUrl: './incident-report-suggested.html',
})
export class IncidentReportSuggested {
  suggestion = input.required<IncidentReport>();
  createIncidentReport = output<IncidentReport>();
}
