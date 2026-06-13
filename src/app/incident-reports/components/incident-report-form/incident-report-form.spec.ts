import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { IncidentReportForm } from './incident-report-form';

describe('IncidentSuggestion - onSubmit', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentReportForm, ReactiveFormsModule],
    }).compileComponents();
  });

  it('should not emit when form is invalid', () => {
    const fixture = TestBed.createComponent(IncidentReportForm);
    const component = fixture.componentInstance;
    const emitSpy = vi.spyOn(component.createIncidentReport, 'emit');
    component.onSubmit();
    expect(emitSpy).not.toHaveBeenCalled();
  });

  it('should emit incident report when form is valid', () => {
    const fixture = TestBed.createComponent(IncidentReportForm);
    const component = fixture.componentInstance;
    const emitSpy = vi.spyOn(component.createIncidentReport, 'emit');
    component.incidentReportForm.setValue({
      title: 'Fire in server room',
      description: 'Smoke detected',
      severity: 'High',
      category: 'Safety',
      location: 'Building A',
      occurredAt: '2026-06-02T10:00',
      immediateActions: 'Evacuated',
      recommendations: 'Install sensors',
    });
    component.onSubmit();
    expect(emitSpy).toHaveBeenCalledTimes(1);
    expect(emitSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Fire in server room',
        description: 'Smoke detected',
        severity: 'High',
        category: 'Safety',
        location: 'Building A',
        immediateActions: 'Evacuated',
        recommendations: 'Install sensors',
        occurredAt: '2026-06-02T10:00',
      }),
    );
  });
});
