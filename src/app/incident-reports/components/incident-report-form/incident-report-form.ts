import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IncidentReport } from '../../interfaces/incident-report.interface';
import { IncidentSuggestion } from '../../../ai/interfaces/incident-suggestion.interface';

@Component({
  selector: 'incident-report-form',
  imports: [ReactiveFormsModule],
  templateUrl: './incident-report-form.html',
})
export class IncidentReportForm {
  incidentSuggestion = input.required<IncidentSuggestion>();
  createIncidentReport = output<IncidentReport>();
  closeIncidentReportFormDialog = output<void>();
  fb = inject(FormBuilder);
  incidentReportForm = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    severity: ['', Validators.required],
    category: ['', Validators.required],
    location: ['', Validators.required],
    occurredAt: ['', Validators.required],
    immediateActions: ['', Validators.required],
    recommendations: ['', Validators.required],
  });
  incidentSuggestionEffect = effect(() => {
    const incidentSuggestion = this.incidentSuggestion();
    this.incidentReportForm.patchValue({
      title: incidentSuggestion.title ?? '',
      description: incidentSuggestion.description ?? '',
      severity: incidentSuggestion.severity ?? '',
      category: incidentSuggestion.category ?? '',
      location: incidentSuggestion.location ?? '',
      occurredAt: '',
      immediateActions: incidentSuggestion.immediateActions ?? '',
      recommendations: incidentSuggestion.recommendations ?? '',
    });
  });

  onSubmit() {
    if (this.incidentReportForm.invalid) return;
    const {
      title,
      description,
      severity,
      category,
      location,
      occurredAt,
      immediateActions,
      recommendations,
    } = this.incidentReportForm.value;
    this.createIncidentReport.emit({
      title: title!,
      description: description!,
      severity: severity as 'Low' | 'Medium' | 'High',
      category: category as 'Safety' | 'Operational' | 'Equipment',
      location: location!,
      occurredAt: occurredAt!,
      immediateActions: immediateActions!,
      recommendations: recommendations!,
    });
  }
}
