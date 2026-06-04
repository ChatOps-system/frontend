import { Component, effect, inject, input, output } from '@angular/core';
import { IncidentReport } from '../../interfaces/incident-report.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'incident-draft',
  imports: [ReactiveFormsModule],
  templateUrl: './incident-draft.html',
})
export class IncidentDraft {
  draft = input.required<IncidentReport>();
  createIncidentReport = output<IncidentReport>();
  closeIncidentDraft = output<void>();
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
  draftEffect = effect(() => {
    const draft = this.draft();
    this.incidentReportForm.patchValue({
      title: draft.title ?? '',
      description: draft.description ?? '',
      severity: draft.severity ?? '',
      category: draft.category ?? '',
      location: draft.location ?? '',
      occurredAt: draft.occurredAt ? new Date().toISOString().slice(0, 16) : '',
      immediateActions: draft.immediateActions ?? '',
      recommendations: draft.recommendations ?? '',
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
      occurredAt: new Date(occurredAt!),
      immediateActions: immediateActions!,
      recommendations: recommendations!,
    });
  }
}
